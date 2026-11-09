async def run_test(page, output_dir, page_url):
    from PIL import Image, ImageChops
    from io import BytesIO
    await page.set_viewport_size({'width':1920,'height':1080})
    try:
        await page.get_by_test_id('email-input').fill('demo@trusted-v.com')
        await page.get_by_test_id('password-input').fill('demo@2025')
        await page.get_by_test_id('login-btn').click()
        await page.get_by_test_id('homepage').wait_for(timeout=20000)
        img=page.get_by_test_id('hero-animation-image')
        await page.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").naturalWidth > 0')
        assert (await img.get_attribute('src')).endswith('hero-platform.gif')
        asset=await page.request.get(await img.evaluate('(el)=>el.src'))
        gif=Image.open(BytesIO(await asset.body()))
        duration=0
        for index in range(gif.n_frames):
            gif.seek(index)
            duration+=gif.info.get('duration',0)
        print(f'GIF metadata: size={gif.size}, frames={gif.n_frames}, duration_ms={duration}, loop={gif.info.get("loop")}')
        assert gif.size == (400,283) and gif.n_frames == 91 and duration == 6070 and gif.info.get('loop') == 0
        bounds=await img.bounding_box()
        samples=[]
        for wait in [0,450,450,6500,450]:
            await page.wait_for_timeout(wait)
            samples.append(Image.open(BytesIO(await page.screenshot(type='jpeg', quality=40, full_page=False, clip=bounds))).convert('RGB'))
        early=ImageChops.difference(samples[0],samples[1]).getbbox() is not None or ImageChops.difference(samples[1],samples[2]).getbbox() is not None
        late=ImageChops.difference(samples[3],samples[4]).getbbox() is not None
        assert early and late
        print('PASS actual changing browser-rendered pixels, animation still changing after full 6.07-second loop')
        await page.get_by_test_id('hero-animation-toggle').click()
        assert (await img.get_attribute('src')).endswith('hero-platform-poster.webp')
        assert await page.get_by_test_id('hero-animation-toggle').get_attribute('aria-label') == 'Play animation'
        await page.wait_for_function('document.querySelector("[data-testid=hero-animation-image]").complete')
        still1=await page.screenshot(type='jpeg', quality=40, full_page=False, clip=bounds)
        await page.wait_for_timeout(600)
        still2=await page.screenshot(type='jpeg', quality=40, full_page=False, clip=bounds)
        assert still1 == still2
        print('PASS pause swaps to stable poster')
        await page.get_by_test_id('hero-animation-toggle').focus()
        await page.keyboard.press('Space')
        assert (await img.get_attribute('src')).endswith('hero-platform.gif')
        print('PASS keyboard Play restarts animated asset')
        for width in [320,768,1024,1440]:
            await page.set_viewport_size({'width':width,'height':1080})
            await page.wait_for_timeout(200)
            await page.evaluate('window.scrollTo(0,0)')
            info=await page.evaluate('''() => { const root=document.querySelector('[data-testid="landing-hero"]'); const visual=root.querySelector('[data-testid="hero-animation-image"]'); const logo=root.querySelector('[data-testid="hero-brand-lockup"] img'); const copy=root.querySelector('.landing-hero-copy'); return {overflow:document.documentElement.scrollWidth>innerWidth, natural:[visual.naturalWidth,visual.naturalHeight],fit:getComputedStyle(visual).objectFit,columns:getComputedStyle(root.querySelector('.landing-hero-grid')).gridTemplateColumns, logo:logo.getBoundingClientRect().toJSON(), visual:visual.getBoundingClientRect().toJSON(),copy:copy.getBoundingClientRect().toJSON(), text:root.innerText}; }''')
            assert not info['overflow'],str(info)
            assert info['natural'] == [400,283] and info['fit'] == 'contain'
            for rect in [info['logo'],info['visual'],info['copy']]:
                assert rect['x'] >= 0 and rect['right'] <= width+1,str(info)
            assert abs(info['visual']['width']/info['visual']['height']-400/283)<0.01
            if width < 900:
                assert info['visual']['top'] > info['copy']['bottom'],str(info)
            else:
                assert info['visual']['left'] >= info['copy']['right'],str(info)
            for removed in ['Rust-first, memory safe','PQC-ready root of trust','IP → SoC → firmware → apps','RV32 · RV64 · Vector']:
                assert removed not in info['text']
            print(f'PASS hero {width}: columns={info["columns"]}, image={info["visual"]["width"]:.1f}x{info["visual"]["height"]:.1f}, no overflow/crop/overlap; removed proof text absent')
            if width in [320,1440]:
                await page.screenshot(path=f"/app/test_reports/artifacts_iter38/automation_output/20261109_081433_87463621eb02/hero_{width}.jpeg", type="jpeg", quality=40, full_page=False)
        assert await page.get_by_test_id('site-nav').get_by_text('Developer',exact=True).count() == 0
        assert await page.get_by_text('Developer Experience',exact=True).count() == 0
        assert await page.get_by_test_id('hero-cta-primary').get_attribute('href') == '/product-suite'
        await page.get_by_test_id('hero-cta-primary').click()
        await page.wait_for_url('**/product-suite')
        assert await page.locator('main').inner_text()
        await page.get_by_test_id('nav-brand').click()
        await page.get_by_test_id('homepage').wait_for()
        await page.get_by_test_id('hero-cta-secondary').click()
        await page.wait_for_url('**/contact')
        assert await page.locator('main').inner_text()
        print('PASS hero CTA route navigation product-suite/contact; global Developer tab absent')
        error_text = await page.evaluate('''() => { const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')); return errorElements.map(el => el.textContent).join(', '); }''')
        print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    except Exception as e:
        print(f'FAIL: {type(e).__name__}: {e}')
