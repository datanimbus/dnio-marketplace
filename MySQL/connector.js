const mysql = require('mysql2/promise');

let logger = global.logger;

module.exports = async (connectorData) => {
	logger.trace("MySQL Connector: Invoked!");
	logger.trace(`MySQL Connector: Connector Data: ${JSON.stringify(connectorData)}`);
	logger.trace(`MySQL Connector: Connecting to MySQL: ${connectorData.database}`);
	try {
		const connection = await mysql.createConnection({
			user: connectorData.user,
			host: connectorData.host,
			database: connectorData.database,
			password: connectorData.password,
			port: connectorData.port,
		});
		logger.info("MySQL Connector: Connected to MySQL");
		logger.info(`MySQL Connector: DB set to ${connectorData.database}`);
		return { client: connection, db: connectorData.database };
	} catch (error) {
		logger.error(`MySQL Connector: Error connecting to MySQL: ${error}`);
		throw {
			"code": "MYSQL_CONNECTOR_ERROR",
			"message": "Error connecting to MySQL",
			"stackTrace": error
		}
	}
}