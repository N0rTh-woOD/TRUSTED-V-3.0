async def run_test(page, output_dir, page_url):
    import importlib.util
    spec=importlib.util.spec_from_file_location('diag','/app/tests/frontend/redesign_diagnostics.py')
    module=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    try:
        await module.run(page)
        print('PASS diagnostics completed')
    except Exception as e:
        print('FAIL diagnostics:',str(e))
