"""Footer navigation, focus visibility and empty-form submission guards."""
import json
import re
from pathlib import Path
from dotenv import dotenv_values

async def run(page):
    base=dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
    section=Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
    creds={k.lower():re.search(rf'- {k}: `([^`]+)`',section).group(1) for k in ('Email','Password')}
    await page.set_viewport_size({'width':1920,'height':1080})
    await page.goto(base+'/login')
    await page.get_by_test_id('email-input').fill(creds['email'])
    await page.get_by_test_id('password-input').fill(creds['password'])
    await page.get_by_test_id('login-btn').click(force=True)
    await page.get_by_test_id('homepage').wait_for()
    results=[]
    try:
        await page.keyboard.press('Tab')
        await page.get_by_test_id('nav-products').focus()
        style=await page.get_by_test_id('nav-products').evaluate('(e)=>({width:getComputedStyle(e).outlineWidth,style:getComputedStyle(e).outlineStyle})')
        assert style['style']!='none' and style['width']!='0px',style
        results.append({'check':'visible focus outline','passed':True})
        print('PASS visible focus outline',style)
    except Exception as e:
        results.append({'check':'visible focus outline','passed':False,'issue':str(e)})
        print('FAIL visible focus outline',e)
    try:
        await page.get_by_test_id('footer-cta').scroll_into_view_if_needed()
        await page.screenshot(path='/app/test_reports/redesign_footer.jpeg',quality=40,full_page=False)
        await page.get_by_test_id('footer-cta').click(force=True)
        await page.wait_for_url(base+'/contact')
        results.append({'check':'footer contact CTA','passed':True})
        print('PASS footer contact CTA')
    except Exception as e:
        results.append({'check':'footer contact CTA','passed':False,'issue':str(e)})
        print('FAIL footer contact CTA',e)
    requests=[]
    page.on('request',lambda r:requests.append(r.url) if '/api/applications/' in r.url and r.method=='POST' else None)
    for route,button in [('/contact','contact-submit'),('/contact-sales','sales-submit-btn'),('/board-support','submit-board-request-btn')]:
        try:
            await page.goto(base+route,wait_until='domcontentloaded')
            await page.get_by_test_id(button).click(force=True)
            await page.wait_for_timeout(250)
            assert not requests,requests
            results.append({'check':'empty form blocked '+route,'passed':True})
            print('PASS empty form blocked',route)
        except Exception as e:
            results.append({'check':'empty form blocked '+route,'passed':False,'issue':str(e)})
            print('FAIL empty form guard',route,e)
    error_text=await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }""")
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')
    Path('/app/test_reports/redesign_guards.json').write_text(json.dumps(results,indent=2))