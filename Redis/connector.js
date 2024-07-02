const Redis = require('ioredis');

let logger = global.logger;

module.exports = async (connectorData) => {
	logger.trace("Redis Connector: Invoked!");
	logger.trace(`Redis Connector: Connector Data: ${JSON.stringify(connectorData)}`);
	logger.trace(`Redis Connector: Connecting to Redis: ${connectorData.connectionString}`);
	try {
		const client = new Redis(connectorData.connectionString);
		logger.info("Redis Connector: Connected to Redis");
		return { client: client };
	} catch (error) {
		logger.error(`Redis Connector: Error connecting to Redis: ${error}`);
		throw {
			"code": "REDIS_CONNECTOR_ERROR",
			"message": "Error connecting to Redis",
			"stackTrace": error
		}
	}
}