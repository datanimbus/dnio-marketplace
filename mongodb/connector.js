const { MongoClient } = require('mongodb');

let logger = global.logger;
let connectorData = null;

async function connect() {
	logger.trace(`Connecting to MongoDB: ${connectorData.connectionString}`);
	// const client = await MongoClient.connect(connectorData.connectionString);
	// const db = client.db(connectorData.database);
	// return { client, db };
}

module.exports = async (_connectorData) => {
	logger.trace("MongoDB Connector called!");
	connectorData = _connectorData
	logger.trace(`Connector Data: ${JSON.stringify(connectorData)}`);
	return await connect();
}