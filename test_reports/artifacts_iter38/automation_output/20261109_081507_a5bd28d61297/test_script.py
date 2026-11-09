async def run_test(page, output_dir, page_url):
    fresh = await page.context.browser.new_context(reduced_motion='reduce',viewport={'width':1920,'height':1080})
    p = await fresh.new_page()
    try:
        asset_requests=[]
        p.on('request',lambda r:asset_requests.append(r.url) if 'hero-platform' in r.url else None)
        await p.goto(page.url)
        await p.get_by_test_id('email-input').fill('demo@trusted-v.com')
        await p.get_by_test_id('password-input').fill('demo@2025')
        await p.get_by_test_id('login-btn').click()
        await p.get_by_test_id('homepage').wait_for(timeout=20000)
        img=p.get_by_test_id('hero-animation-image')
        await p.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").naturalWidth > 0')
        assert (await img.get_attribute('src')).endswith('hero-platform-poster.webp')
        assert await p.get_by_test_id('hero-animation-toggle').get_attribute('aria-label') == 'Play animation'
        assert not any(url.endswith('hero-platform.gif') for url in asset_requests),str(asset_requests)
        print('PASS fresh context reduced-motion preference set BEFORE navigation/login; poster only requested')
        await p.get_by_test_id('hero-animation-toggle').click()
        assert (await img.get_attribute('src')).endswith('hero-platform.gif')
        await p.get_by_test_id('hero-animation-toggle').click()
        assert (await img.get_attribute('src')).endswith('hero-platform-poster.webp')
        print('PASS reduced-motion explicit opt-in Play and toggle back to still')
        await p.emulate_media(reduced_motion='no-preference')
        await p.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").src.endsWith("hero-platform.gif")')
        await p.emulate_media(reduced_motion='reduce')
        await p.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").src.endsWith("hero-platform-poster.webp")')
        print('PASS live OS motion preference changes update image and controls')
        print('SECTION TESTIDS:', await p.locator('section[data-testid]').evaluate_all('(els)=>els.map(el=>el.dataset.testid)'))
        for testid in ['virtualization-spotlight','platform-architecture','application-markets','product-families','core-technologies','services-teaser','final-cta']:
            assert await p.get_by_test_id(testid).count() == 1,testid
        assert await p.get_by_text('SiFive',exact=True).count() > 0
        assert 'RISC-V native' in await p.get_by_test_id('platform-architecture').inner_text()
        print('PASS preserved virtualization/architecture/markets/product/technology/services/final sections and SiFive content')
        assert await p.get_by_test_id('module-tab-software').get_attribute('data-state') == 'active'
        tabs=p.locator('[data-testid^="module-tab-"]')
        for i in range(await tabs.count()):
            tab=tabs.nth(i)
            await tab.click()
            assert await tab.get_attribute('data-state') == 'active'
        before=await p.get_by_test_id('module-showcase-counter').inner_text()
        await p.get_by_test_id('module-next').click()
        assert before != await p.get_by_test_id('module-showcase-counter').inner_text()
        await p.get_by_test_id('module-prev').click()
        assert before == await p.get_by_test_id('module-showcase-counter').inner_text()
        print('PASS all module tabs plus next/previous controls')
        await p.get_by_test_id('core-technologies').scroll_into_view_if_needed()
        count=await p.get_by_test_id('technology-carousel-counter').inner_text()
        await p.get_by_test_id('carousel-btn-next').click()
        await p.wait_for_timeout(300)
        next_count=await p.get_by_test_id('technology-carousel-counter').inner_text()
        assert count != next_count
        await p.wait_for_timeout(7000)
        assert next_count == await p.get_by_test_id('technology-carousel-counter').inner_text()
        await p.get_by_test_id('carousel-btn-prev').click()
        await p.wait_for_timeout(300)
        assert count == await p.get_by_test_id('technology-carousel-counter').inner_text()
        print('PASS technology manual next/previous; no autoplay after 7 seconds')
        await p.set_viewport_size({'width':320,'height':844})
        await p.get_by_test_id('nav-mobile-toggle').click()
        assert await p.get_by_test_id('site-nav').get_by_text('Developer',exact=True).count() == 0
        assert await p.get_by_test_id('mobile-nav-logout').is_visible()
        await p.get_by_test_id('mobile-nav-logout').click()
        await p.get_by_test_id('login-page').wait_for()
        print('PASS mobile navigation no Developer tab and logout')
        error_text = await p.evaluate('''() => { const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')); return errorElements.map(el => el.textContent).join(', '); }''')
        print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    except Exception as e:
        print(f'FAIL: {type(e).__name__}: {e}')
    finally:
        await fresh.close()
