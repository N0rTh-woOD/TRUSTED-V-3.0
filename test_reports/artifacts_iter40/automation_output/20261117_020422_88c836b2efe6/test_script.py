async def run_test(page, output_dir, page_url):
    import importlib.util
    try:
        spec = importlib.util.spec_from_file_location('team_gate_review', '/app/tests/frontend/team_gate_review.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        await module.run(page)
    except Exception as e:
        print(f'FAIL browser suite execution: {e}')
