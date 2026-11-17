async def run_test(page, output_dir, page_url):
    import importlib.util
    spec=importlib.util.spec_from_file_location('guards','/app/tests/frontend/redesign_guards.py')
    module=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    try:
        await module.run(page)
    except Exception as e:
        print('FAIL final guards:',str(e))
