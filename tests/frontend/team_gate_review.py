"""Browser regression for team-neutral informational site; no form records submitted."""
import json
import re
from pathlib import Path

BASE_URL = re.search(r'^REACT_APP_BACKEND_URL=(.+)$', Path('/app/frontend/.env').read_text(), re.M).group(1).strip().rstrip('/')

async def run(page):
    results = []
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)

    async def check(label, action):
        try:
            await action()
            results.append({'check': label, 'passed': True})
            print('PASS ' + label)
        except Exception as error:
            results.append({'check': label, 'passed': False, 'error': str(error)})
            print('FAIL ' + label + ': ' + str(error))

    async def visible(testid):
        await page.get_by_test_id(testid).wait_for(state='visible', timeout=15000)

    async def gate():
        await page.goto(BASE_URL + '/marketplace')
        await page.wait_for_url('**/login', timeout=15000)
        await visible('login-btn')
    await page.set_viewport_size({'width': 1920, 'height': 1080})
    await check('anonymous marketplace sign-in gate', gate)

    for role, heading in [('admin', 'Admin User'), ('demo', 'Demo User')]:
        section = Path('/app/memory/test_credentials.md').read_text().split('### ' + heading)[1].split('###')[0]
        creds = {k.lower(): re.search(rf'- {k}: `([^`]+)`', section).group(1) for k in ('Email', 'Password')}

        async def login():
            await page.set_viewport_size({'width': 1920, 'height': 1080})
            await page.goto(BASE_URL + '/login')
            await page.get_by_test_id('email-input').fill(creds['email'])
            await page.get_by_test_id('password-input').fill(creds['password'])
            await page.get_by_test_id('login-btn').click(force=True)
            await page.wait_for_url(BASE_URL + '/', timeout=20000)
            await visible('homepage')
            assert await page.locator('a[href^="/admin"]').count() == 0
            assert not await page.get_by_test_id('homepage').get_by_text('Admin Dashboard', exact=True).count()
        await check(role + ' same informational homepage', login)

        async def desktop_menu():
            await page.get_by_test_id('nav-account-menu').click(force=True)
            await visible('nav-account-dropdown')
            assert 'Admin' not in await page.get_by_test_id('site-nav').inner_text()
            assert await page.locator('a[href^="/admin"]').count() == 0
            await page.get_by_test_id('nav-account').click(force=True)
            await page.wait_for_url('**/account')
            await visible('username-input')
        await check(role + ' desktop navigation and account access', desktop_menu)

        async def video():
            await page.goto(BASE_URL + '/')
            await visible('hero-animation-image')
            video = page.get_by_test_id('hero-animation-image')
            await page.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").currentTime > 0', timeout=20000)
            state = await video.evaluate('(v) => ({tag:v.tagName,loop:v.loop,controls:v.controls,paused:v.paused,src:v.currentSrc,time:v.currentTime})')
            assert state['tag'] == 'VIDEO' and state['loop'] and not state['controls'] and not state['paused'] and '.mp4' in state['src']
            await page.wait_for_timeout(600)
            assert await video.evaluate('(v) => v.currentTime') != state['time']
            assert await page.get_by_test_id('hero-animation').get_by_role('button').count() == 0
        await check(role + ' visible looping MP4 without pause', video)

        async def mobile_menu():
            await page.set_viewport_size({'width':390,'height':844})
            await page.get_by_test_id('nav-mobile-toggle').click(force=True)
            await visible('mobile-nav-account')
            assert 'Admin' not in await page.get_by_test_id('site-nav').inner_text()
            assert await page.locator('a[href^="/admin"]').count() == 0
            await page.get_by_test_id('mobile-nav-marketplace').click(force=True)
            await visible('marketplace-list')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            await page.set_viewport_size({'width':1920,'height':1080})
        await check(role + ' mobile navigation no admin', mobile_menu)

        for route in ['/admin', '/admin/hardware', '/admin/middleware', '/admin/software', '/admin/ide', '/admin/applications', '/admin/users', '/admin/llm', '/admin/users/TEST_deep/edit']:
            async def retired(route=route):
                await page.goto(BASE_URL + route)
                await visible('retired-feature-page')
                assert await page.get_by_test_id('retired-feature-title').inner_text() == 'This feature is no longer available.'
                assert await page.locator('main input, main textarea, main button').count() == 0
                assert await page.locator('a[href^="/admin"]').count() == 0
            await check(role + ' unavailable ' + route, retired)

        for route, testid in [('/product-suite', 'modules-detail'), ('/partners', 'platform-page'), ('/services', 'services-page'), ('/contact', 'contact-form'), ('/partner-registration', 'submit-partner-application-btn')]:
            async def info(route=route, testid=testid):
                await page.goto(BASE_URL + route)
                await page.get_by_test_id(testid).wait_for(state='attached', timeout=15000)
                assert await page.locator('h1').first.inner_text()
                assert await page.locator('a[href^="/admin"]').count() == 0
            await check(role + ' informational ' + route, info)

        async def marketplace():
            await page.goto(BASE_URL + '/marketplace')
            await page.locator('[data-testid^="hw-"]').first.wait_for(timeout=15000)
            await page.get_by_test_id('marketplace-search').fill('TEST_no_matching_item')
            assert await page.locator('[data-testid^="hw-"]').count() == 0
            await page.get_by_test_id('marketplace-search').fill('')
            await page.get_by_test_id('tab-ip').click(force=True)
            await page.get_by_test_id('ip-ibex-risc-v-core').wait_for()
            await page.get_by_test_id('marketplace-search').fill('Ibex')
            assert await page.locator('[data-testid^="ip-"]').count() == 1
        await check(role + ' marketplace catalog search and tabs', marketplace)

        async def contact_form():
            await page.goto(BASE_URL + '/contact')
            await page.get_by_test_id('input-first-name').fill('TEST_not_submitted')
            await page.get_by_test_id('input-email').fill('TEST_review@example.com')
            await page.get_by_test_id('input-message').fill('TEST_not_submitted')
            assert await page.get_by_test_id('contact-submit').is_enabled()
            await page.get_by_test_id('link-partner-reg').click(force=True)
            await page.wait_for_url('**/partner-registration')
            assert not await page.get_by_test_id('submit-partner-application-btn').is_enabled()
            await page.get_by_test_id('agree-terms-checkbox').click(force=True)
            assert await page.get_by_test_id('submit-partner-application-btn').is_enabled()
        await check(role + ' contact inputs and partner terms gate (no submission)', contact_form)

        async def mobile_services():
            await page.set_viewport_size({'width':390,'height':844})
            await page.goto(BASE_URL + '/services')
            await visible('services-page')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            await page.get_by_test_id('services-cta').scroll_into_view_if_needed()
            assert await page.get_by_test_id('services-cta-ide').is_visible()
            await page.screenshot(path='/app/test_reports/services_iter40.jpeg',quality=40,full_page=False)
            await page.set_viewport_size({'width':1920,'height':1080})
        await check(role + ' mobile services layout', mobile_services)

        async def logout():
            await page.goto(BASE_URL + '/')
            await page.get_by_test_id('nav-account-menu').click(force=True)
            await page.get_by_test_id('nav-logout').click(force=True)
            await page.wait_for_url('**/login')
            await visible('login-page')
        await check(role + ' logout', logout)

    error_text = await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }""")
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    print('Browser console/runtime errors: ' + json.dumps(errors))
    Path('/app/test_reports/team_gate_browser_results.json').write_text(json.dumps({'checks':results,'console_errors':errors},indent=2))
    print(f'Browser checks: {sum(r["passed"] for r in results)}/{len(results)} passed')