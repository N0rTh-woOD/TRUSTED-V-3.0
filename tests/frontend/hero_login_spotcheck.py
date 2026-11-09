"""Homepage preservation and hero/login testability regression; run with an async Playwright page."""
from pathlib import Path
import re


async def run(page):
    # Load the configured public URL and existing demo credentials, never change account data.
    env = Path('/app/frontend/.env').read_text()
    url = re.search(r'^REACT_APP_BACKEND_URL=(.+)$', env, re.M).group(1).strip()
    credentials = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1]
    email = re.search(r'Email: `([^`]+)`', credentials).group(1)
    password = re.search(r'Password: `([^`]+)`', credentials).group(1)
    await page.set_viewport_size({'width': 1920, 'height': 1080})
    try:
        await page.goto(url + '/login')
        await page.get_by_test_id('email-input').fill(email)
        await page.get_by_test_id('password-input').fill(password)
        await page.get_by_test_id('login-btn').click()
        await page.get_by_test_id('homepage').wait_for(timeout=20000)
        for testid in ['ai-engines-preview', 'riscv-ip', 'virtualization-spotlight',
                       'platform-architecture', 'application-markets', 'product-families',
                       'core-technologies', 'services-teaser', 'final-cta']:
            assert await page.get_by_test_id(testid).count() == 1, testid
        assert 'sifive' in (await page.get_by_test_id('riscv-ip').inner_text()).lower()
        assert 'risc-v native' in (await page.get_by_test_id('platform-architecture').inner_text()).lower()
        print('PASS: all nine unchanged sections, SiFive and architecture native content')
        assert await page.get_by_test_id('module-tab-software').get_attribute('data-state') == 'active'
        tabs = page.locator('[data-testid^="module-tab-"]')
        for i in range(await tabs.count()):
            tab = tabs.nth(i)
            await tab.click()
            assert await tab.get_attribute('data-state') == 'active'
        before = await page.get_by_test_id('module-showcase-counter').inner_text()
        await page.get_by_test_id('module-next').click()
        assert before != await page.get_by_test_id('module-showcase-counter').inner_text()
        await page.get_by_test_id('module-prev').click()
        assert before == await page.get_by_test_id('module-showcase-counter').inner_text()
        print('PASS: all product tabs and next/previous controls')
        await page.get_by_test_id('core-technologies').scroll_into_view_if_needed()
        count = await page.get_by_test_id('technology-carousel-counter').inner_text()
        await page.get_by_test_id('carousel-btn-next').click()
        await page.wait_for_timeout(700)
        next_count = await page.get_by_test_id('technology-carousel-counter').inner_text()
        assert count != next_count
        await page.wait_for_timeout(7000)
        assert next_count == await page.get_by_test_id('technology-carousel-counter').inner_text()
        await page.get_by_test_id('carousel-btn-prev').click()
        await page.wait_for_timeout(700)
        assert count == await page.get_by_test_id('technology-carousel-counter').inner_text()
        print('PASS: manual technology carousel next/previous and no autoplay after 7 seconds')
        for testid in ['landing-hero', 'login-page']:
            if testid == 'login-page':
                await page.set_viewport_size({'width': 320, 'height': 844})
                await page.get_by_test_id('nav-mobile-toggle').click()
                assert await page.get_by_test_id('site-nav').get_by_text('Developer', exact=True).count() == 0
                await page.get_by_test_id('mobile-nav-logout').click()
                await page.get_by_test_id('login-page').wait_for()
            missing = await page.get_by_test_id(testid).evaluate('''root => Array.from(root.querySelectorAll('button,a,input,label,h1,p')).filter(el => !el.dataset.testid).map(el => el.outerHTML)''')
            assert not missing, str(missing)
        assert await page.evaluate('localStorage.getItem("token") === null')
        print('PASS: hero/login interactive and critical text testids; mobile logout; no Developer nav')
        error_text = await page.evaluate('''() => { const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')); return errorElements.map(el => el.textContent).join(', '); }''')
        print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    except Exception as exc:
        print(f'FAIL: {type(exc).__name__}: {exc}')
        raise