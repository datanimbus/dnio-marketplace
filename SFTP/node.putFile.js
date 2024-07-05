let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("SFTP Put File Node: Invoked!");
	try {
		logger.trace(`SFTP Put File Node: input - ${JSON.stringify(inputData)}`);
		const result = await connectorData.client.put(inputData.localFile, inputData.remoteFile);
		logger.trace(`SFTP Put Files Node: Put File successful`);
		logger.trace(`SFTP Put Files Node: Put File response : ${JSON.stringify(result)}`);
		return { result: result };
	} catch (error) {
		logger.error(`SFTP Put Files Node: Error putting file in SFTP: ${error}`);
		throw {
			"code": "SFTP_PUT_FILE_ERROR",
			"message": "Error putting file in SFTP",
			"stackTrace": error
		}
	}
}