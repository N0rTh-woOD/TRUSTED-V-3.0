async def run_test(page, output_dir, page_url):
    import importlib.util
    try:
        spec = importlib.util.spec_from_file_location('ai_retirement_diagnostics', '/app/tests/frontend/ai_retirement_diagnostics.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        await module.run(page)
    except Exception as e:
        print(f'FAIL: diagnostics runner: {e}')
