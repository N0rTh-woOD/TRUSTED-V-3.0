"""Verify browser-created records and remove only their returned exact ids."""
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('/app/backend/.env')
client = MongoClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
records = [
    ('sales_inquiries', 'ff828f11-b6a1-457f-a18c-1a65b14bbdca', 'TEST_EditorialContact_41_single'),
    ('partnership_applications', 'd32c3fac-ed11-43aa-bbc7-a58e3c2cfc59', 'TEST_EditorialPartner_41_single'),
    ('board_support_requests', '4e55b0e1-5015-40d7-a1ff-28d372921212', 'TEST_EditorialBoard_41_single'),
    ('sales_inquiries', '4b683a91-7c22-455d-91a2-1e773301a52f', 'TEST_e45eb35fee17444ba497259255a4d387'),
    ('sales_inquiries', '1df7020b-a681-47fe-a003-be29933266eb', 'TEST_eee1959d0a2347b4a5be81ca7f23ba95'),
    ('sales_inquiries', 'c2813e40-8f14-4ef4-9167-022015d1249c', 'TEST_b6409f93c4e943199c0c8afa0e771917'),
    ('sales_inquiries', 'e85e7d06-b858-4cf9-bad0-1358194d13e9', 'TEST_040e64d46c2b466cbde0f6eafe683887'),
    ('sales_inquiries', '00a81b7a-3ff6-49ca-8258-1951f8b8b70e', 'TEST_EditorialSales_41_single'),
]
for collection, record_id, marker in records:
    row = db[collection].find_one({'id': record_id})
    if row is None:
        print('Already cleaned', record_id)
        continue
    try:
        assert row is not None
        data = row['data'] if collection == 'sales_inquiries' else row
        assert data['email'] == marker + '@example.com'
        assert (data['message'] if collection == 'sales_inquiries' else data['description']) in [marker, marker + ' editorial regression']
        if collection == 'partnership_applications':
            assert data['motivation'] == marker and data['company_type'] == 'hardware'
            assert data['products'] == 'AI / ML Accelerators' and data['agree_terms'] is True
        print('PASS UI persistence', collection, record_id)
    finally:
        db[collection].delete_one({'id': record_id})
        assert db[collection].find_one({'id': record_id}) is None
        print('PASS exact-id cleanup', record_id)

# Inspect only; cleanup above always uses the exact recorded id and matching email.
for collection in ['sales_inquiries', 'partnership_applications', 'board_support_requests']:
    timestamp = 'created_at' if collection == 'sales_inquiries' else 'submitted_at'
    rows = list(db[collection].find({timestamp: {'$gte': '2026-11-17T02:20:00'}}, {'_id': 0}))
    print('Recent remaining ids for review', collection, [(r['id'], (r.get('data') or r).get('name') or r.get('company_name')) for r in rows])
client.close()