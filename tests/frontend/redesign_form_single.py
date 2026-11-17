"""Bounded single-form runner; persist unique submission intentions before clicking."""
import json
import re
import uuid
from pathlib import Path
from dotenv import dotenv_values

async def run(page,kind):
    base = dotenv_values('/app/frontend/.env')['REACT_APP_BACKEND_URL'].rstrip('/')
    section = Path('/app/memory/test_credentials.md').read_text().split('### Demo User')[1].split('###')[0]
    creds = {k.lower():re.search(rf'- {k}: `([^`]+)`',section).group(1) for k in ('Email','Password')}
    await page.set_viewport_size({'width':1920,'height':1080})
    page.set_default_timeout(7000)
    await page.goto(base+'/login')
    await page.get_by_test_id('email-input').fill(creds['email'])
    await page.get_by_test_id('password-input').fill(creds['password'])
    await page.get_by_test_id('login-btn').click(force=True)
    await page.get_by_test_id('homepage').wait_for()
    marker = 'TEST_Redesign42Single_'+uuid.uuid4().hex
    email = marker+'@example.com'
    specs = {
      'contact':('/contact',{'input-first-name':marker,'input-last-name':'Review','input-email':email,'input-company':marker,'input-country':'India','input-message':marker},'contact-submit','sales_inquiries',None),
      'sales':('/contact-sales',{'sales-name':marker,'sales-email':email,'sales-company':marker,'sales-phone':'+15555550100','sales-message':marker},'sales-submit-btn','sales_inquiries','sales-success'),
      'partner':('/partner-registration',{'partner-company-name-input':marker,'partner-contact-name-input':marker,'partner-email-input':email,'partner-phone-input':'+15555550100','partner-website-input':'https://example.com','partner-description-input':marker,'partner-motivation-input':marker},'submit-partner-application-btn','partnership_applications','partner-success-message'),
      'board':('/board-support',{'board-company-input':marker,'board-contact-input':marker,'board-email-input':email,'board-name-input':marker,'board-manufacturer-input':marker,'board-architecture-input':'RISC-V','board-description-input':marker,'board-use-case-input':marker},'submit-board-request-btn','board_support_requests','board-support-success')}
    route,fields,button,collection,success = specs[kind]
    await page.goto(base+route,wait_until='domcontentloaded')
    for tid,value in fields.items():
        await page.get_by_test_id(tid).fill(value)
    if kind=='partner':
        assert await page.get_by_test_id(button).is_disabled()
        await page.get_by_test_id('partner-type-hardware').click(force=True)
        await page.get_by_test_id('partner-category-development-boards').click(force=True)
        await page.get_by_test_id('agree-terms-checkbox').click(force=True)
    elif kind=='sales':
        await page.get_by_test_id('sales-plan').select_option('enterprise')
        await page.get_by_test_id('sales-team-size').select_option('6-20')
    elif kind=='contact':
        await page.get_by_test_id('input-interest').select_option('Certification')
    out = Path('/app/test_reports/redesign_form_intents.json')
    data = json.loads(out.read_text()) if out.exists() else []
    row = {'kind':kind,'email':email,'marker':marker,'collection':collection,'ui_success':False}
    data.append(row)
    out.write_text(json.dumps(data,indent=2))
    await page.get_by_test_id(button).click(force=True)
    await page.wait_for_timeout(1200)
    if success:
        assert await page.get_by_test_id(success).is_visible(), 'Success screen absent'
    else:
        assert await page.get_by_test_id('input-first-name').input_value() == ''
        assert await page.get_by_text('Thank you. Our team will get back to you within 1 business day.',exact=True).is_visible()
    row['ui_success'] = True
    out.write_text(json.dumps(data,indent=2))
    print('PASS form UI success:',kind,email)
    error_text = await page.evaluate("""() => {
        const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
        return errorElements.map(el => el.textContent).join(", ");
    }""")
    print(f'Found error message: {error_text}' if error_text else 'No error messages found on the page')