"""Read exact unique UI emails, verify fields and delete only captured matching ids."""
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('/app/backend/.env')
client = MongoClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
path = Path('/app/test_reports/redesign_form_intents.json')
rows = json.loads(path.read_text())
for r in rows:
    collection = db[r['collection']]
    query = {'data.email':r['email']} if r['collection']=='sales_inquiries' else {'email':r['email']}
    record = collection.find_one(query)
    if record is None:
        print('No persisted record for intention',r['kind'],r['email'])
        continue
    fields = record['data'] if r['collection']=='sales_inquiries' else record
    r['id'] = record['id']
    try:
        assert fields['email'] == r['email']
        marker,kind = r['marker'],r['kind']
        assert fields['message' if kind in ('sales','contact') else 'description'] == marker
        if kind in ('sales','contact'):
            assert fields['company'] == marker
            assert fields['name'] == (marker+' Review' if kind=='contact' else marker)
            assert fields['product_interest'] == ('Certification' if kind=='contact' else 'Plan: enterprise')
            if kind=='sales':
                assert fields['phone']=='+15555550100' and fields['team_size']=='6-20'
            else:
                assert fields['country']=='India'
        else:
            assert fields['company_name']==marker and fields['contact_name']==marker
            if kind=='partner':
                assert fields['motivation']==marker and fields['products']=='Development Boards'
                assert fields['agree_terms'] is True and fields['company_type']=='hardware'
                assert fields['website']=='https://example.com' and fields['phone']=='+15555550100'
            else:
                assert fields['architecture']=='RISC-V' and fields['use_case']==marker
                assert fields['board_name']==marker and fields['board_manufacturer']==marker
        r['persistence_verified']=True
        print('PASS all UI form fields persisted:',kind)
    finally:
        collection.delete_one({'id':record['id'],**query})
        assert collection.find_one({'id':record['id']}) is None
        r['cleaned']=True
        print('PASS exact-id cleanup',record['id'])
path.write_text(json.dumps(rows,indent=2))
client.close()