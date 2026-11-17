async def run_test(page, output_dir, page_url):
    await page.set_viewport_size({"width":1920,"height":1080})
    try:
        await page.get_by_test_id('login-page').wait_for(timeout=15000)
        print('PASS: unauthenticated homepage redirects to login')
        await page.screenshot(path='/app/test_reports/artifacts_iter42/automation_output/20261117_035628_51e74eb49b6f/login_redesign.jpeg', type="jpeg", quality=40, full_page=False)
    except Exception as e:
        print(f'FAIL initial load: {e}')
