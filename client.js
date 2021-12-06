require('dotenv').config();

const URI = process.env['MONGO_URI'];
const { MongoClient } = require('mongodb');

async function main() {
    const client = new MongoClient(URI);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}

async function listDatabases(client) {
    let databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);