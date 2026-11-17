"""Inspect this run's unique marker only; delete individual ids with verified run email."""
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('/app/backend/.env')
client=MongoClient(os.environ['MONGO_URL'])
db=client[os.environ['DB_NAME']]
captured=[]
for name in ['sales_inquiries','partnership_applications','board_support_requests']:
    collection=db[name]
    key='data.email' if name=='sales_inquiries' else 'email'
    rows=list(collection.find({key:{'$regex':'^TEST_Redesign42_'}},{'_id':0}))
    for row in rows:
        fields=row['data'] if name=='sales_inquiries' else row
        print('Inspect timed-out-run record:',name,row['id'],fields['email'])
        assert fields['email'].startswith('TEST_Redesign42_')
        captured.append({'collection':name,'id':row['id'],'payload':fields})
        collection.delete_one({'id':row['id'],key:fields['email']})
        assert collection.find_one({'id':row['id']}) is None
        print('PASS exact-id cleanup:',row['id'])
Path('/app/test_reports/redesign_timeout_records.json').write_text(json.dumps(captured,indent=2))
client.close()