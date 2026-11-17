"""Read-only browser checks for AI retirement and retained TRUSTED-V navigation."""
import os
import re
from pathlib import Path
from dotenv import load_dotenv


async def run(page):
    load_dotenv('/app/frontend/.env')
    base = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
    credentials = Path('/app/memory/test_credentials.md').read_text()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
    forbidden = re.compile(r'solution\s*builder|AI\s*chat|code\s*engine|AI\s*engines|gemini|openai|chatgpt|LLM\s*configuration|model\s*settings', re.I)
    passed, failed = [], []

    async def check(name, operation):
        try:
            await operation()
            passed.append(name)
            print('PASS: ' + name)
        except Exception as error:
            failed.append(name)
            print(f'FAIL: {name}: {error}')

    async def clean_page():
        await page.get_by_test_id('site-nav').wait_for()
        await page.wait_for_timeout(400)
        text = await page.locator('body').inner_text()
        assert not forbidden.search(text), f'Retired label visible: {forbidden.findall(text)}'
        links = await page.locator('a:visible').evaluate_all('(els) => els.map(el => el.getAttribute("href"))')
        assert not any(link in ['/builder', '/solution-builder', '/chat', '/product/code-engine', '/admin/llm'] for link in links)
        assert await page.locator('main').inner_text(), 'Blank main content'

    for role, heading in [('admin', 'Admin User'), ('demo', 'Demo User')]:
        section = credentials.split('### ' + heading)[1].split('###')[0]
        email = re.search(r'- Email: `([^`]+)`', section).group(1)
        password = re.search(r'- Password: `([^`]+)`', section).group(1)
        await page.set_viewport_size({'width': 1920, 'height': 1080})
        await page.goto(base + '/login')

        async def login():
            await page.get_by_test_id('email-input').fill(email)
            await page.get_by_test_id('password-input').fill(password)
            await page.get_by_test_id('login-btn').click(force=True)
            await page.get_by_test_id('homepage').wait_for(timeout=15000)
            await clean_page()
        await check(role + ' UI login and homepage', login)
        if role + ' UI login and homepage' in failed:
            break

        async def hero():
            video = page.get_by_test_id('hero-animation-image')
            await page.wait_for_function('document.querySelector("video[data-testid=hero-animation-image]")?.readyState >= 2')
            state = await video.evaluate('(v) => ({tag:v.tagName, muted:v.muted, autoplay:v.autoplay, loop:v.loop, controls:v.controls, paused:v.paused, time:v.currentTime, duration:v.duration, source:v.currentSrc})')
            assert state['tag'] == 'VIDEO' and state['muted'] and state['autoplay'] and state['loop']
            assert not state['controls'] and not state['paused'] and state['source'].endswith('.mp4'), state
            assert await page.get_by_test_id('hero-animation').locator('button').count() == 0
            await page.wait_for_timeout(600)
            assert await video.evaluate('(v) => v.currentTime') != state['time']
            print('Video attributes/playback verified: muted, autoplay, loop, no controls')
            if role == 'admin':
                await page.screenshot(path='/app/test_reports/hero_iter39.jpeg', quality=40, full_page=False)
        await check(role + ' hero MP4 playback', hero)

        async def mega():
            await page.get_by_test_id('nav-products').hover()
            await page.get_by_test_id('mega-products').wait_for()
            await clean_page()
            await page.get_by_test_id('mega-secure-boot').click(force=True)
            await page.wait_for_url('**/product/secure-boot')
            await clean_page()
        await check(role + ' desktop products menu and secure boot link', mega)

        for testid, route in [('nav-products', '/product-suite'), ('nav-platform', '/partners'), ('nav-marketplace', '/marketplace'), ('nav-services', '/services'), ('nav-contact-cta', '/contact')]:
            async def navigate(testid=testid, route=route):
                await page.get_by_test_id(testid).click(force=True)
                await page.wait_for_url(base + route)
                await clean_page()
            await check(role + ' desktop ' + route, navigate)

        if role == 'admin':
            async def admin_dashboard():
                await page.get_by_test_id('nav-account-menu').click(force=True)
                await page.get_by_test_id('nav-admin').click(force=True)
                await page.get_by_test_id('admin-section-software-components').wait_for()
                await clean_page()
                await page.get_by_test_id('admin-section-software-components').click(force=True)
                await page.get_by_test_id('add-software-btn').wait_for()
                await clean_page()
                await page.get_by_test_id('add-software-btn').click(force=True)
                await page.get_by_role('dialog').wait_for()
                assert not forbidden.search(await page.get_by_role('dialog').inner_text())
                await page.get_by_role('dialog').get_by_role('combobox').first.click(force=True)
                await page.wait_for_timeout(200)
                assert 'LLM' not in await page.get_by_role('listbox').inner_text()
                await page.keyboard.press('Escape')
                await page.keyboard.press('Escape')
            await check('admin dashboard, software page and component types', admin_dashboard)

        for route in ['/solution-builder', '/builder', '/chat', '/product/code-engine', '/admin/llm']:
            async def retired(route=route):
                await page.goto(base + route)
                await page.get_by_test_id('retired-feature-page').wait_for()
                assert await page.get_by_test_id('retired-feature-title').inner_text() == 'This feature is no longer available.'
                await clean_page()
                await page.get_by_test_id('retired-feature-products-link').click(force=True)
                await page.wait_for_url('**/product-suite')
                await clean_page()
            await check(role + ' retired ' + route, retired)

        async def history():
            await page.goto(base + '/projects')
            await clean_page()
            labels = await page.locator('main button, main a').all_inner_texts()
            assert not any(re.search('generate|download|builder', label, re.I) for label in labels), labels
        await check(role + ' historical projects have no generation/download controls', history)

        await page.set_viewport_size({'width': 390, 'height': 844})
        for testid, route in [('mobile-nav-product-suite', '/product-suite'), ('mobile-nav-platform', '/partners'), ('mobile-nav-marketplace', '/marketplace'), ('mobile-nav-services', '/services'), ('mobile-nav-contact-cta', '/contact')]:
            async def mobile_navigation(testid=testid, route=route):
                await page.get_by_test_id('nav-mobile-toggle').click(force=True)
                await clean_page()
                await page.get_by_test_id(testid).click(force=True)
                await page.wait_for_url(base + route)
                await clean_page()
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
            await check(role + ' mobile ' + route, mobile_navigation)

        async def mobile_home():
            await page.get_by_test_id('nav-brand').click(force=True)
            await page.get_by_test_id('homepage').wait_for()
            await clean_page()
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            if role == 'demo':
                await page.screenshot(path='/app/test_reports/mobile_home_iter39.jpeg', quality=40, full_page=False)
        await check(role + ' mobile homepage', mobile_home)

        async def logout():
            await page.get_by_test_id('nav-mobile-toggle').click(force=True)
            await page.get_by_test_id('mobile-nav-logout').click(force=True)
            await page.get_by_test_id('login-page').wait_for()
        await check(role + ' logout', logout)

    error_text = await page.evaluate('''() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }''')
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    print('BROWSER_ERRORS: ' + repr(errors))
    print(f'UI_RESULTS: {len(passed)} passed; {len(failed)} failed; failures={failed}')