async def run_test(page, output_dir, page_url):
    import importlib.util
    spec=importlib.util.spec_from_file_location('forms','/app/tests/frontend/redesign_form_single.py')
    module=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    for kind in ['contact','partner','board']:
        try:
            if kind != 'contact':
                await page.context.clear_cookies()
                await page.evaluate('localStorage.removeItem("token")')
            await module.run(page,kind)
        except Exception as e:
            print('FAIL bounded form:',kind,str(e))
