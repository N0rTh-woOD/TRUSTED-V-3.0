async def run_test(page, output_dir, page_url):
    import importlib.util
    try:
        spec = importlib.util.spec_from_file_location('hero_login_spotcheck','/app/tests/frontend/hero_login_spotcheck.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        await module.run(page)
    except Exception as e:
        print(f'Spotcheck execution failed: {type(e).__name__}: {e}')
