let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("SFTP List Files Node: Invoked!");
	try {
		logger.trace(`SFTP List Files Node: input - ${JSON.stringify(inputData)}`);
		logger.info(`SFTP List Files Node: Listing files in path ${inputData.path}`);
		const result = await connectorData.client.list(inputData.path);
		logger.trace(`SFTP List Files Node: List Files successful`);
		logger.trace(`SFTP List Files Node: List Files response : ${JSON.stringify(result)}`);
		return result;
	} catch (error) {
		logger.error(`SFTP List Files Node: Error listing files in SFTP: ${error}`);
		throw {
			"code": "SFTPL_LIST_FILES_ERROR",
			"message": "Error listing files in SFTP",
			"stackTrace": error
		}
	}
}