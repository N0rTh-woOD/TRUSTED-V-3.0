async def run_test(page, output_dir, page_url):
    try:
        await page.set_viewport_size({"width":1920,"height":1080})
        await page.wait_for_url('**/login', timeout=20000)
        await page.get_by_test_id('login-submit').wait_for(timeout=10000)
        print('PASS unauthenticated marketplace redirects to login')
        await page.screenshot(path='/app/test_reports/artifacts_iter40/automation_output/20261117_020244_d16431ca638c/gate_iter40.jpeg', type="jpeg", quality=40, full_page=False)
    except Exception as e:
        print(f'FAIL initial gate: {e}')
