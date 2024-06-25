const { Client } = require('pg');

let logger = global.logger;

module.exports = async (connectorData) => {
	logger.trace("PostgreSQL Connector: Invoked!");
	logger.trace(`PostgreSQL Connector: Connector Data: ${JSON.stringify(connectorData)}`);
	logger.trace(`PostgreSQL Connector: Connecting to PostgreSQL: ${connectorData.connectionString}`);
	try {
		const client = new Client({
			user: connectorData.user,
			password: connectorData.password,
			host: connectorData.host,
			port: connectorData.port,
			database: connectorData.database,
		});
		await client.connect()
		logger.info("PostgreSQL Connector: Connected to PostgreSQL");
		logger.info(`PostgreSQL Connector: DB set to ${connectorData.database}`)
		return { pgCon: client };
	} catch (error) {
		logger.error(`PostgreSQL Connector: Error connecting to PostgreSQL: ${error}`);
		throw {
			"code": "PostgreSQL_CONNECTOR_ERROR",
			"message": "Error connecting to PostgreSQL",
			"stackTrace": error
		}
	}
}