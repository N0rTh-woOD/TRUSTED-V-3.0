// MongoDB Initialization Script
// This script runs when the MongoDB container is first created

// Switch to admin database
db = db.getSiblingDB('admin');

// Create application database
db = db.getSiblingDB('trusted_v_db');

// Create application user
db.createUser({
  user: 'trustedv',
  pwd: 'trustedvpass',
  roles: [
    { role: 'readWrite', db: 'trusted_v_db' }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('hardware');
db.createCollection('software');
db.createCollection('middleware');
db.createCollection('ides');
db.createCollection('projects');
db.createCollection('partners');
db.createCollection('llm_settings');

print('MongoDB initialized successfully!');
print('Database: trusted_v_db');
print('User: trustedv');
