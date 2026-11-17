async def run_test(page, output_dir, page_url):
    import importlib.util
    spec = importlib.util.spec_from_file_location('redesign','/app/tests/frontend/redesign_review.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    try:
        await module.run(page,'forms')
    except Exception as e:
        print('FAIL forms suite:',str(e))
