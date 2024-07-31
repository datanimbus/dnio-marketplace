let Client = require('ssh2-sftp-client');

let logger = global.logger;

module.exports = async (connectorData) => {
	logger.trace("SFTP Connector: Invoked!");
	logger.trace(`SFTP Connector: Connector Data: ${JSON.stringify(connectorData)}`);
	try {
		const client = new Client();
		await client.connect({
			host: connectorData.host,
			port: connectorData.port,
			username: connectorData.user,
			password: connectorData.password,
			privateKey: connectorData.privateKey,
			passphrase: connectorData.passphrase
		});
		logger.info("SFTP Connector: Connected to SFTP");
		return { client: client };
	} catch (error) {
		logger.error(`SFTP Connector: Error connecting to SFTP: ${error}`);
		throw {
			"code": "SFTP_CONNECTOR_ERROR",
			"message": "Error connecting to SFTP",
			"stackTrace": error
		}
	}
}