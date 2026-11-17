"""Diagnose Services mobile overflow and anonymous legacy-route handling."""
import os
import re
from pathlib import Path
from dotenv import load_dotenv


async def run(page):
    load_dotenv('/app/frontend/.env')
    base = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
    await page.set_viewport_size({'width': 390, 'height': 844})
    for route in ['/solution-builder', '/builder', '/chat', '/product/code-engine', '/admin/llm']:
        try:
            await page.goto(base + route)
            await page.get_by_test_id('login-page').wait_for()
            print(f'OBSERVED anonymous {route}: redirected to {page.url}; unavailable screen absent')
        except Exception as error:
            print(f'FAIL anonymous route check {route}: {error}')
    try:
        section = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
        await page.get_by_test_id('email-input').fill(re.search(r'- Email: `([^`]+)`', section).group(1))
        await page.get_by_test_id('password-input').fill(re.search(r'- Password: `([^`]+)`', section).group(1))
        await page.get_by_test_id('login-btn').click(force=True)
        await page.get_by_test_id('homepage').wait_for()
        await page.goto(base + '/services')
        await page.get_by_test_id('services-page').wait_for()
        print('SERVICES_WIDTH: ' + str(await page.evaluate('({viewport:innerWidth, document:document.documentElement.scrollWidth})')))
        overflowing = await page.locator('[data-testid="services-page"] *').evaluate_all('''els => els.filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(el => ({tag:el.tagName, testid:el.dataset.testid, class:el.className, right:el.getBoundingClientRect().right, text:el.textContent.slice(0,80)})).slice(-15)''')
        print('OVERFLOW_ELEMENTS: ' + repr(overflowing))
        await page.get_by_test_id('services-cta').scroll_into_view_if_needed()
        await page.screenshot(path='/app/test_reports/services_overflow_iter39.jpeg', quality=40, full_page=False)
        print('PASS: overflow RCA collected')
    except Exception as error:
        print(f'FAIL overflow diagnostics: {error}')