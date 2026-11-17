"""Enterprise redesign: route/layout, navigation/carousel and public form integration."""
import json
import re
import uuid
from pathlib import Path
from dotenv import dotenv_values

BASE = dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
OUT = Path('/app/test_reports/redesign_browser_results.json')
RECORDS = Path('/app/test_reports/redesign_ui_records.json')

async def run(page, mode):
    results, errors = [], []
    page.set_default_timeout(8000)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    async def check(name, fn):
        try:
            await fn()
            results.append({'check': name, 'passed': True})
            print('PASS:', name)
        except Exception as e:
            results.append({'check': name, 'passed': False, 'issue': str(e)})
            print('FAIL:', name, str(e))
    async def goto(route):
        await page.goto(BASE + route, wait_until='domcontentloaded')
        await page.get_by_test_id('site-nav').wait_for()
        await page.locator('main h1').first.wait_for()
    async def login():
        section = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
        creds = {k.lower(): re.search(rf'- {k}: `([^`]+)`', section).group(1) for k in ('Email','Password')}
        await page.goto(BASE + '/login')
        await page.get_by_test_id('email-input').fill(creds['email'])
        await page.get_by_test_id('password-input').fill(creds['password'])
        await page.get_by_test_id('login-btn').click(force=True)
        await page.get_by_test_id('homepage').wait_for()
    await page.set_viewport_size({'width':1920,'height':1080})
    await check('demo login ' + mode, login)
    if mode == 'pages':
        routes = ['/', '/about', '/product-suite', '/developer-portal', '/hardware-catalog', '/marketplace', '/product/secure-boot', '/product/crypto-stack', '/product/rtos-benchmark', '/partners', '/partner-registration', '/download-ide', '/webide', '/blog', '/board-support', '/contact-sales', '/contact', '/services']
        for width, height in [(1920,1080),(390,844)]:
            await page.set_viewport_size({'width':width,'height':height})
            for route in routes:
                async def load(route=route):
                    await goto(route)
                    assert await page.get_by_test_id('site-footer').count() == 1
                    dims = await page.evaluate('({width:innerWidth,document:document.documentElement.scrollWidth})')
                    assert dims['document'] <= dims['width'], str(dims)
                    assert len(await page.locator('main').inner_text()) > 100
                    top = await page.locator('main h1').first.bounding_box()
                    header = await page.get_by_test_id('site-nav').bounding_box()
                    assert top['y'] >= header['height'], str(top)
                    if route in ['/', '/product-suite', '/services', '/contact', '/board-support']:
                        await page.screenshot(path=f'/app/test_reports/redesign_{width}_{route.strip("/") or "home"}.jpeg',quality=40,full_page=False)
                await check(f'{width}px route/layout {route}', load)
        async def labels():
            await goto('/download-ide')
            assert 'Coming soon' in await page.get_by_test_id('ide-hero-coming-soon').inner_text()
            await goto('/webide')
            assert 'Coming soon' in await page.get_by_test_id('webide-coming-soon').inner_text()
        await check('Coming soon availability preserved', labels)
    if mode == 'navigation':
        async def hero():
            for tid in ['site-nav','landing-hero','hero-brand-lockup','landing-hero-title']:
                assert await page.get_by_test_id(tid).is_visible()
            assert await page.get_by_test_id('site-footer').count() == 1
            video = page.locator('[data-testid="landing-hero"] video')
            assert await video.count() == 1
            await page.wait_for_timeout(1000)
            print('Hero video state', await video.evaluate('(v)=>({readyState:v.readyState,width:v.videoWidth,error:v.error?.message})'))
            assert await video.evaluate('(v)=>v.readyState >= 2 && v.videoWidth > 0')
        await check('homepage header, hero frame and footer',hero)
        async def focus_menu():
            await page.get_by_test_id('nav-products').focus()
            assert await page.get_by_test_id('mega-products').is_visible()
            assert await page.get_by_test_id('nav-products').get_attribute('aria-expanded') == 'true'
        await check('product menu opens on keyboard focus',focus_menu)
        async def escape_menu():
            await page.keyboard.press('Escape')
            await page.wait_for_timeout(250)
            assert not await page.get_by_test_id('mega-products').is_visible(), 'Escape does not dismiss products menu'
        await check('product menu Escape dismissal',escape_menu)
        async def tab_menu():
            await page.get_by_test_id('nav-products').focus()
            await page.keyboard.press('Tab')
            active = await page.evaluate('document.activeElement.dataset.testid')
            print('Tab after Products:',active)
            assert active.startswith('mega-'), 'Tab goes to '+str(active)+' instead of revealed product links'
        await check('product menu keyboard tab sequence',tab_menu)
        for tid,target in [('mega-jarvyn-ide','/download-ide'),('mega-webide','/webide'),('mega-developer-portal','/developer-portal'),('mega-secure-boot','/product/secure-boot'),('mega-crypto-stack','/product/crypto-stack'),('mega-rtos-options','/product/rtos-benchmark'),('mega-featured-cta','/product-suite'),('nav-contact-cta','/contact')]:
            async def link(tid=tid,target=target):
                if tid.startswith('mega-'):
                    await page.get_by_test_id('nav-products').hover()
                    await page.get_by_test_id('mega-products').wait_for()
                await page.get_by_test_id(tid).click(force=True)
                await page.wait_for_url(BASE+target)
            await check('desktop destination '+tid,link)
        async def account():
            await page.get_by_test_id('nav-account-menu').click(force=True)
            await page.get_by_test_id('nav-account').click(force=True)
            await page.wait_for_url(BASE+'/account')
        await check('account settings navigation',account)
        await goto('/')
        async def carousel():
            counter = page.get_by_test_id('technology-carousel-counter')
            await counter.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
            before = await counter.inner_text()
            await page.wait_for_timeout(6000)
            assert await counter.inner_text() == before, 'Automatic carousel rotation'
            await page.get_by_test_id('carousel-btn-next').click(force=True)
            await page.wait_for_timeout(600)
            after = await counter.inner_text()
            assert after != before
            await page.get_by_test_id('carousel-btn-prev').focus()
            await page.keyboard.press('Enter')
            await page.wait_for_timeout(600)
            assert await counter.inner_text() == before
            await page.get_by_test_id('core-technologies-carousel').focus()
            await page.keyboard.press('ArrowRight')
            await page.wait_for_timeout(600)
            assert await counter.inner_text() != before
        await check('manual carousel, controls and keyboard',carousel)
        async def reduced():
            await page.emulate_media(reduced_motion='reduce')
            await page.get_by_test_id('carousel-btn-prev').click(force=True)
            assert await page.get_by_test_id('core-technologies-carousel').is_visible()
            print('Reduced motion scroll behavior:',await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior'))
        await check('carousel reduced motion interaction',reduced)
        await page.set_viewport_size({'width':390,'height':844})
        await goto('/')
        async def mobile():
            await page.get_by_test_id('nav-mobile-toggle').click(force=True)
            await page.get_by_test_id('mobile-nav-products-toggle').click(force=True)
            assert await page.get_by_test_id('mobile-nav-products-toggle').get_attribute('aria-expanded') == 'true'
            for tid in ['mobile-nav-jarvyn-ide-coming-soon','mobile-nav-webide-coming-soon','mobile-nav-secure-boot','mobile-nav-crypto-stack','mobile-nav-rtos']:
                assert await page.get_by_test_id(tid).is_visible()
            dims = await page.evaluate('({width:innerWidth,document:document.documentElement.scrollWidth})')
            assert dims['document'] <= dims['width']
            cta = await page.get_by_test_id('mobile-nav-contact-cta').bounding_box()
            print('Expanded mobile contact bounds:',cta)
            await page.screenshot(path='/app/test_reports/redesign_mobile_drawer.jpeg',quality=40,full_page=False)
            assert cta['y'] >= 0 and cta['y'] + cta['height'] <= 844, 'Contact CTA below viewport in expanded drawer: '+str(cta)
        await check('mobile accordion and persistent contact CTA',mobile)
        async def mobile_link():
            await page.get_by_test_id('mobile-nav-secure-boot').click(force=True)
            await page.wait_for_url(BASE+'/product/secure-boot')
            assert not await page.get_by_test_id('mobile-nav-products-toggle').count()
        await check('mobile product destination and drawer closes',mobile_link)
        async def touch():
            await goto('/')
            track = page.get_by_test_id('technology-carousel-track')
            await track.scroll_into_view_if_needed()
            counter = page.get_by_test_id('technology-carousel-counter')
            before = await counter.inner_text()
            box = await track.bounding_box()
            x,y = min(350,box['x']+box['width']-20), box['y']+100
            session = await page.context.new_cdp_session(page)
            await session.send('Input.dispatchTouchEvent', {'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
            for step in range(1,6):
                await session.send('Input.dispatchTouchEvent', {'type':'touchMove','touchPoints':[{'x':x-step*50,'y':y}]})
            await session.send('Input.dispatchTouchEvent', {'type':'touchEnd','touchPoints':[]})
            await page.wait_for_timeout(700)
            assert await counter.inner_text() != before
            await session.detach()
        await check('mobile carousel touch swipe',touch)
        async def logout():
            await page.set_viewport_size({'width':1920,'height':1080})
            await page.get_by_test_id('nav-account-menu').click(force=True)
            await page.get_by_test_id('nav-logout').click(force=True)
            await page.get_by_test_id('login-page').wait_for()
            assert await page.evaluate('localStorage.getItem("token")') is None
            await page.goto(BASE+'/services')
            await page.get_by_test_id('login-page').wait_for()
        await check('logout clears session and restores gate',logout)
    if mode == 'forms':
        specs = [
            ('contact','/contact',{'input-first-name':'{marker}','input-last-name':'Review','input-email':'{marker}@example.com','input-company':'{marker}','input-country':'United States','input-message':'{marker}'},'contact-submit','sales-inquiry','sales_inquiries',None),
            ('sales','/contact-sales',{'sales-name':'{marker}','sales-email':'{marker}@example.com','sales-company':'{marker}','sales-phone':'+15555550100','sales-message':'{marker}'},'sales-submit-btn','sales-inquiry','sales_inquiries','sales-success'),
            ('partner','/partner-registration',{'partner-company-name-input':'{marker}','partner-contact-name-input':'{marker}','partner-email-input':'{marker}@example.com','partner-phone-input':'+15555550100','partner-website-input':'https://example.com','partner-description-input':'{marker}','partner-motivation-input':'{marker}'},'submit-partner-application-btn','partnership','partnership_applications','partner-success-message'),
            ('board','/board-support',{'board-company-input':'{marker}','board-contact-input':'{marker}','board-email-input':'{marker}@example.com','board-name-input':'{marker}','board-manufacturer-input':'{marker}','board-architecture-input':'RISC-V','board-description-input':'{marker}','board-use-case-input':'{marker}'},'submit-board-request-btn','board-support','board_support_requests','board-support-success')]
        for kind,path,fields,button,endpoint,collection,success in specs:
            async def submit(kind=kind,path=path,fields=fields,button=button,endpoint=endpoint,collection=collection,success=success):
                await goto(path)
                marker = 'TEST_Redesign42_'+uuid.uuid4().hex
                for tid,value in fields.items():
                    await page.get_by_test_id(tid).fill(value.replace('{marker}',marker))
                if kind == 'contact':
                    await page.get_by_test_id('input-interest').select_option(label='Certification')
                elif kind == 'sales':
                    await page.get_by_test_id('sales-plan').select_option('enterprise')
                    await page.get_by_test_id('sales-team-size').select_option('6-20')
                elif kind == 'partner':
                    assert await page.get_by_test_id(button).is_disabled()
                    await page.get_by_test_id('partner-type-hardware').click(force=True)
                    await page.get_by_test_id('partner-category-development-boards').click(force=True)
                    await page.get_by_test_id('agree-terms-checkbox').click(force=True)
                async with page.expect_response(lambda r: '/api/applications/'+endpoint in r.url and r.request.method=='POST',timeout=10000) as pending:
                    await page.get_by_test_id(button).click(force=True)
                response = await pending.value
                assert response.status == 200
                body = await response.json()
                records = json.loads(RECORDS.read_text()) if RECORDS.exists() else []
                records.append({'kind':kind,'id':body['id'],'collection':collection,'payload':response.request.post_data_json})
                RECORDS.write_text(json.dumps(records,indent=2))
                print('Recorded exact submission id:',kind,body['id'])
                if success:
                    await page.get_by_test_id(success).wait_for()
                else:
                    await page.get_by_text('Thank you. Our team will get back to you within 1 business day.',exact=True).wait_for()
                    assert await page.get_by_test_id('input-first-name').input_value() == ''
            await check('valid form payload and UI success '+kind,submit)
    error_text = await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }""")
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    print('Browser errors:',errors)
    data = json.loads(OUT.read_text()) if OUT.exists() else {}
    data[mode] = {'checks':results,'browser_errors':errors}
    OUT.write_text(json.dumps(data,indent=2))
    print('TOTAL',mode,sum(r['passed'] for r in results),'/',len(results))