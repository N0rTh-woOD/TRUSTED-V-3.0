async def run_test(page, output_dir, page_url):
    try:
        await page.set_viewport_size({"width":1920,"height":1080})
        await page.get_by_test_id('login-page').wait_for()
        print('PASS: frontend loads login page')
        await page.screenshot(path='/app/test_reports/artifacts_iter39/automation_output/20261117_013912_72e83370539f/login_iter39.jpeg', type="jpeg", quality=40, full_page=False)
    except Exception as e:
        print(f'FAIL: frontend loading: {e}')
