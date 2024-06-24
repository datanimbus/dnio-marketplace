const { MongoClient } = require('mongodb');

let logger = global.logger;

module.exports = async (connectorData) => {
	logger.trace("MongoDB Connector: Invoked!");
	logger.trace(`MongoDB Connector: Connector Data: ${JSON.stringify(connectorData)}`);
	logger.trace(`MongoDB Connector: Connecting to MongoDB: ${connectorData.connectionString}`);
	try {
		const client = await MongoClient.connect(connectorData.connectionString);
		logger.info("MongoDB Connector: Connected to MongoDB")
		const db = client.db(connectorData.database);
		logger.info(`MongoDB Connector: DB set to ${connectorData.database}`)
		return { client, db };
	} catch (error) {
		logger.error(`MongoDB Connector: Error connecting to MongoDB: ${error}`);
	}
}