async def run_test(page, output_dir, page_url):
    import importlib.util
    spec=importlib.util.spec_from_file_location('forms','/app/tests/frontend/redesign_form_single.py')
    module=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    try:
        await module.run(page,'sales')
    except Exception as e:
        print('FAIL sales bounded test:',str(e))
