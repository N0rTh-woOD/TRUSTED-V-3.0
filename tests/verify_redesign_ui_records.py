"""Verify redesign UI submissions then clean only captured exact record ids."""
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('/app/backend/.env')
client = MongoClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
records = json.loads(Path('/app/test_reports/redesign_ui_records.json').read_text())
for record in records:
    collection = db[record['collection']]
    row = collection.find_one({'id':record['id']})
    assert row is not None, record['id']
    fields = row['data'] if record['collection'] == 'sales_inquiries' else row
    assert fields['email'] == record['payload']['email']
    try:
        for key,value in record['payload'].items():
            assert fields[key] == value,(record['kind'],key)
        print('PASS UI database persistence:',record['kind'])
    finally:
        collection.delete_one({'id':record['id'],'data.email':fields['email']} if record['collection']=='sales_inquiries' else {'id':record['id'],'email':fields['email']})
        assert collection.find_one({'id':record['id']}) is None
        print('PASS exact-id cleanup:',record['id'])
client.close()