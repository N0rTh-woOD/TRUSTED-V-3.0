"""Rendered public copy, navigation, form integration and responsive smoke checks."""
import json
import re
import uuid
from pathlib import Path
from dotenv import dotenv_values

async def run(page):
    base = dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
    section = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
    creds = {key.lower(): re.search(rf'- {key}: `([^`]+)`', section).group(1) for key in ('Email', 'Password')}
    results, records, errors, console_errors, texts = [], [], [], [], {}
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
    async def check(name, action):
        try:
            await action()
            results.append({'check': name, 'passed': True})
            print('PASS', name)
        except Exception as error:
            results.append({'check': name, 'passed': False, 'issue': str(error)})
            print('FAIL', name, str(error))
    async def goto(path):
        await page.goto(base + path)
        await page.get_by_test_id('site-nav').wait_for(state='visible')
        await page.get_by_role('heading', level=1).first.wait_for(state='visible')
    async def login():
        await page.goto(base + '/login')
        await page.get_by_test_id('email-input').fill(creds['email'])
        await page.get_by_test_id('password-input').fill(creds['password'])
        await page.get_by_test_id('login-btn').click(force=True)
        await page.get_by_test_id('homepage').wait_for(state='visible')
    await page.set_viewport_size({'width': 1920, 'height': 1080})
    await check('demo login', login)
    for route in ['/', '/product-suite', '/services', '/contact', '/partners', '/download-ide', '/webide', '/developer-portal', '/marketplace', '/about']:
        async def load(route=route):
            await goto(route)
            assert await page.get_by_test_id('site-footer').count() == 1
            assert (await page.get_by_test_id('nav-contact-cta').inner_text()).strip() == 'Contact us'
            texts[route] = await page.locator('body').inner_text()
            assert len(texts[route]) > 300
        await check('page loads ' + route, load)
    async def products():
        await goto('/product-suite')
        assert 'Silicon Sign-Off & Trust' in await page.get_by_test_id('modules-detail').inner_text()
        assert 'SignOff Silicon' in await page.get_by_test_id('sub-brands').inner_text()
        for tid in ['module-01-jarvyn-ide-coming-soon', 'module-01-webide-coming-soon']:
            assert 'Coming soon' in await page.get_by_test_id(tid).inner_text()
    await check('suite naming and availability', products)
    async def ide():
        await goto('/download-ide')
        assert 'Coming soon' in await page.get_by_test_id('ide-hero-coming-soon').inner_text()
        assert 'EDITOR AND TOOLING' in (await page.get_by_test_id('ide-feature-legend').inner_text()).upper()
        assert 'Embedded-aware tooling' in await page.get_by_test_id('ide-feature-02').inner_text()
        assert 'Hardware-aware tooling' in await page.get_by_test_id('ide-comparison').inner_text()
        assert not re.search(r'\bAI(?:[- ]powered|[- ]native)?\b', texts['/download-ide'], re.I)
    await check('Jarvyn planned hardware-aware copy, no AI capability claim', ide)
    async def webide():
        await goto('/webide')
        assert (await page.get_by_test_id('webide-coming-soon').inner_text()).strip() == 'Coming soon'
        assert 'coming soon' in (await page.get_by_role('heading', level=1).inner_text()).lower()
    await check('WebIDE Coming soon', webide)
    async def services():
        await goto('/services')
        assert (await page.get_by_test_id('services-cta-ide').inner_text()).strip() == 'View Jarvyn IDE status'
        await page.get_by_test_id('services-cta-ide').click(force=True)
        await page.wait_for_url('**/download-ide')
    await check('Services status CTA copy and destination', services)
    for tid, target in [('nav-brand','/'), ('nav-products','/product-suite'), ('nav-marketplace','/marketplace'), ('nav-platform','/partners'), ('nav-services','/services'), ('nav-about','/about'), ('nav-contact-cta','/contact')]:
        async def nav(tid=tid, target=target):
            await page.get_by_test_id(tid).click(force=True)
            await page.wait_for_url(base + target)
            await page.get_by_role('heading', level=1).first.wait_for(state='visible')
        await check('navigation ' + tid, nav)
    for tid, target in [('mega-jarvyn-ide','/download-ide'), ('mega-webide','/webide'), ('mega-developer-portal','/developer-portal')]:
        async def mega(tid=tid, target=target):
            await page.get_by_test_id('nav-products').hover()
            await page.get_by_test_id('mega-products').wait_for(state='visible')
            if tid != 'mega-developer-portal':
                assert 'Coming soon' in await page.get_by_test_id(tid).inner_text()
            await page.get_by_test_id(tid).click(force=True)
            await page.wait_for_url(base + target)
        await check('product menu ' + tid, mega)
    async def footer():
        footer_text = ' '.join((await page.get_by_test_id('site-footer').inner_text()).split())
        assert 'Jarvyn IDE · Coming soon' in footer_text
        assert 'WebIDE · Coming soon' in footer_text
        assert (await page.get_by_test_id('footer-cta').inner_text()).strip().lower() == 'contact us'
        await page.get_by_test_id('footer-cta').click(force=True)
        await page.wait_for_url('**/contact')
    await check('footer labels and CTA link', footer)
    async def submit(kind, path, fields, button, endpoint, collection, success):
        await goto(path)
        marker = 'TEST_' + uuid.uuid4().hex
        for tid, value in fields.items():
            await page.get_by_test_id(tid).fill(value.replace('{marker}', marker))
        if kind == 'contact':
            await page.get_by_test_id('input-interest').select_option(label='Silicon Sign-Off & Trust')
        if kind == 'sales':
            await page.get_by_test_id('sales-plan').select_option('enterprise')
            await page.get_by_test_id('sales-team-size').select_option('6-20')
        if kind == 'partner':
            await page.get_by_test_id('partner-type-hardware').click(force=True)
            await page.get_by_test_id('partner-category-ai-ml-accelerators').click(force=True)
            await page.get_by_test_id('agree-terms-checkbox').click(force=True)
        async with page.expect_response(lambda response: '/api/applications/' + endpoint in response.url and response.request.method == 'POST') as pending:
            await page.get_by_test_id(button).click(force=True)
        response = await pending.value
        payload = response.request.post_data_json
        body = await response.json()
        assert response.status == 200, str(body)
        records.append({'kind': kind, 'collection': collection, 'id': body['id'], 'payload': payload})
        if kind == 'contact':
            await page.wait_for_function("document.querySelector('[data-testid=\"input-first-name\"]').value === ''")
            await page.get_by_text('Thank you. Our team will get back to you within 1 business day.', exact=True).wait_for(state='visible')
        else:
            await page.get_by_test_id(success).wait_for(state='visible')
        print('Saved submission', kind, body['id'])
    form_specs = [
        ('contact','/contact',{'input-first-name':'{marker}','input-last-name':'Review','input-email':'{marker}@example.com','input-company':'{marker}','input-country':'United States','input-message':'{marker} editorial regression'},'contact-submit','sales-inquiry','sales_inquiries',None),
        ('sales','/contact-sales',{'sales-name':'{marker}','sales-email':'{marker}@example.com','sales-company':'{marker}','sales-phone':'+15555550100','sales-message':'{marker} editorial regression'},'sales-submit-btn','sales-inquiry','sales_inquiries','sales-success'),
        ('partner','/partner-registration',{'partner-company-name-input':'{marker}','partner-contact-name-input':'{marker}','partner-email-input':'{marker}@example.com','partner-description-input':'{marker}','partner-motivation-input':'{marker}'},'submit-partner-application-btn','partnership','partnership_applications','partner-success-home-button'),
        ('board','/board-support',{'board-company-input':'{marker}','board-contact-input':'{marker}','board-email-input':'{marker}@example.com','board-name-input':'{marker}','board-manufacturer-input':'{marker}','board-description-input':'{marker}'},'submit-board-request-btn','board-support','board_support_requests','board-support-success')
    ]
    for spec in form_specs:
        await check('valid UI submission and success ' + spec[0], lambda spec=spec: submit(*spec))
    for route in ['/services','/product-suite']:
        async def mobile(route=route):
            await page.set_viewport_size({'width':390, 'height':844})
            await goto(route)
            dims = await page.evaluate('({width:innerWidth, document:document.documentElement.scrollWidth})')
            assert dims['document'] <= dims['width'], str(dims)
            if route == '/services':
                await page.get_by_test_id('services-cta-ide').scroll_into_view_if_needed()
                bounds = await page.get_by_test_id('services-cta-ide').bounding_box()
                assert bounds['x'] >= 0 and bounds['x'] + bounds['width'] <= 391
                await page.screenshot(path='/app/test_reports/services_mobile_iter41.jpeg',quality=40,full_page=False)
            print('Mobile dimensions', route, dims)
        await check('mobile no horizontal overflow ' + route, mobile)
    async def mobile_menu():
        await page.get_by_test_id('nav-mobile-toggle').click(force=True)
        for tid in ['mobile-nav-jarvyn-ide-coming-soon','mobile-nav-webide-coming-soon']:
            assert 'Coming soon' in await page.get_by_test_id(tid).inner_text()
        await page.get_by_test_id('mobile-nav-services').click(force=True)
        await page.wait_for_url('**/services')
    await check('mobile navigation status labels and link', mobile_menu)
    error_text = await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }""")
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    print('Runtime errors:', errors, 'Console errors:', console_errors)
    output = {'checks':results,'submissions':records,'runtime_errors':errors,'console_errors':console_errors,'page_text':texts}
    Path('/app/test_reports/public_editorial_browser_results.json').write_text(json.dumps(output,indent=2))
    print('TOTAL:', sum(item['passed'] for item in results),'/',len(results))