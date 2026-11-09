async def run_test(page, output_dir, page_url):
    import os
    await page.set_viewport_size({"width":1920,"height":1080})
    try:
        await page.get_by_test_id('login-page').wait_for()
        assert await page.get_by_test_id('login-title').inner_text() == 'Welcome back.'
        assert await page.locator('input').count() == 2
        assert await page.get_by_test_id('password-input').get_attribute('type') == 'password'
        assert await page.get_by_test_id('password-input').get_attribute('autocomplete') == 'current-password'
        assert await page.get_by_test_id('email-input').get_attribute('autocomplete') == 'username'
        assert await page.locator('a').count() == 0
        await page.get_by_test_id('login-btn').click()
        assert await page.get_by_test_id('email-input').evaluate('(el) => el.validity.valueMissing')
        await page.get_by_test_id('email-input').fill('invalid-email')
        await page.get_by_test_id('password-input').fill('TEST_invalid_password')
        await page.get_by_test_id('login-btn').click()
        assert await page.get_by_test_id('email-input').evaluate('(el) => el.validity.typeMismatch')
        print('PASS: minimalist login, required/email validation, masking and autocomplete')
        await page.get_by_test_id('email-input').fill('')
        await page.get_by_test_id('password-input').fill('')
        await page.get_by_test_id('email-input').focus()
        await page.keyboard.press('Tab')
        assert await page.get_by_test_id('password-input').evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Tab')
        assert await page.get_by_test_id('login-btn').evaluate('(el) => el === document.activeElement')
        print('PASS: keyboard input/submit tab sequence')
        for width in [320,768,1024,1440]:
            await page.set_viewport_size({'width':width,'height':844 if width == 320 else 1080})
            info=await page.evaluate('''() => { const p=document.querySelector('[data-testid="login-page"]'); const b=document.querySelector('[data-testid="login-brand-lockup"] img'); const f=document.querySelector('[data-testid="login-form"]'); const s=document.querySelector('[data-testid="login-btn"]'); return {overflow:document.documentElement.scrollWidth>innerWidth, logoLoaded:b.complete&&b.naturalWidth>0, logo:b.getBoundingClientRect().toJSON(), form:f.getBoundingClientRect().toJSON(), button:s.getBoundingClientRect().toJSON()}; }''')
            assert not info['overflow'] and info['logoLoaded'],str(info)
            assert info['logo']['x'] >= 0 and info['logo']['right'] <= width,str(info)
            assert abs(info['form']['width']-info['button']['width']) < 1,str(info)
            print(f'PASS login responsive {width}: {info}')
            if width in [320,1440]:
                await page.screenshot(path=f"/app/test_reports/artifacts_iter38/automation_output/20261109_081332_7b87cd44f2e7/login_{width}.jpeg", type="jpeg", quality=40, full_page=False)
        await page.set_viewport_size({'width':1920,'height':1080})
        await page.get_by_test_id('email-input').fill('demo@trusted-v.com')
        await page.get_by_test_id('password-input').fill('TEST_invalid_password')
        async with page.expect_response(lambda r:'/api/auth/login' in r.url) as response_info:
            await page.get_by_test_id('login-btn').click()
        response=await response_info.value
        assert response.status == 401
        await page.get_by_test_id('login-btn').wait_for(state='visible')
        await page.wait_for_timeout(300)
        assert await page.get_by_test_id('login-btn').is_enabled()
        assert await page.get_by_text('Invalid credentials',exact=True).is_visible()
        print('PASS: invalid credentials error visible and submit re-enabled')
        await page.get_by_test_id('password-input').fill('demo@2025')
        await page.get_by_test_id('password-input').press('Enter')
        await page.get_by_test_id('homepage').wait_for(timeout=20000)
        print('PASS: demo error-retry and keyboard Enter sign-in')
        await page.reload()
        await page.get_by_test_id('homepage').wait_for(timeout=20000)
        assert await page.evaluate('Boolean(localStorage.getItem("token"))')
        print('PASS: refreshed authenticated demo session')
        print('AVAILABLE NAV TESTIDS:',await page.locator('header [data-testid]').evaluate_all('(els)=>els.map(el=>({id:el.dataset.testid,text:el.innerText}))'))
        error_text = await page.evaluate('''() => { const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')); return errorElements.map(el => el.textContent).join(', '); }''')
        print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    except Exception as e:
        print(f'FAIL: {type(e).__name__}: {e}')
