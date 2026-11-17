"""Reproduce menu hit-target overlap and identify mobile overflow owners."""
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
    results={}
    await page.get_by_test_id('nav-products').hover()
    await page.get_by_test_id('mega-products').wait_for()
    results['desktop_menu']=await page.get_by_test_id('mega-products').evaluate("""el=>({bounds:el.getBoundingClientRect().toJSON(),inner:el.querySelector('.grid').getBoundingClientRect().toJSON(),links:Array.from(el.querySelectorAll('a')).map(a=>({tid:a.dataset.testid,bounds:a.getBoundingClientRect().toJSON()}))})""")
    await page.screenshot(path='/app/test_reports/redesign_mega_overlap.jpeg',quality=40,full_page=False)
    await page.get_by_test_id('nav-about').focus()
    results['menu_stays_open_after_focus_leaves']=await page.get_by_test_id('mega-products').is_visible()
    await page.set_viewport_size({'width':390,'height':844})
    await page.goto(base+'/',wait_until='domcontentloaded')
    await page.get_by_test_id('nav-mobile-toggle').click(force=True)
    await page.get_by_test_id('mobile-nav-products-toggle').click(force=True)
    results['mobile_menu']=await page.evaluate("""()=>({group:document.querySelector('#mobile-products-links').parentElement.getBoundingClientRect().toJSON(),links:Array.from(document.querySelectorAll('header a[data-testid^="mobile-nav-"]')).map(a=>{const b=a.getBoundingClientRect();return {tid:a.dataset.testid,bounds:b.toJSON(),centerHit:document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.closest('a,button')?.dataset.testid}})})""")
    await page.get_by_test_id('mobile-nav-secure-boot').click(force=True)
    await page.wait_for_timeout(300)
    results['secure_boot_click_actual_url']=page.url
    print('Actual mobile Secure Boot click URL:',page.url)
    for route in ['/developer-portal','/download-ide','/webide']:
        await page.goto(base+route,wait_until='domcontentloaded')
        await page.locator('main h1').first.wait_for()
        results[route]=await page.evaluate("""()=>({document:document.documentElement.scrollWidth,width:innerWidth,overflow:Array.from(document.querySelectorAll('main *')).filter(e=>{const b=e.getBoundingClientRect();return b.width && b.right>innerWidth+1 && getComputedStyle(e).position!=='absolute'}).map(e=>({tag:e.tagName,tid:e.dataset.testid,classes:e.className,text:e.textContent.slice(0,100),bounds:e.getBoundingClientRect().toJSON(),display:getComputedStyle(e).display})).slice(-20)})""")
        await page.screenshot(path='/app/test_reports/redesign_overflow_'+route.strip('/')+'.jpeg',quality=40,full_page=False)
        print('Overflow:',route,results[route]['document'])
    await page.emulate_media(reduced_motion='reduce')
    results['reduced_motion_html_scroll']=await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior')
    print(json.dumps(results,indent=2))
    Path('/app/test_reports/redesign_diagnostics.json').write_text(json.dumps(results,indent=2))