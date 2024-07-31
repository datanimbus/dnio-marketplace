let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("SFTP Get File Node: Invoked!");
	try {
		logger.trace(`SFTP Get File Node: input - ${JSON.stringify(inputData)}`);
		logger.info(`SFTP Get File Node: Getting file ${inputData.filePath}`);
		const result = await connectorData.client.get(inputData.filePath);
		logger.trace(`SFTP Get Files Node: Get File successful`);
		logger.trace(`SFTP Get Files Node: Get File response : ${JSON.stringify(result)}`);
		return result;
	} catch (error) {
		logger.error(`SFTP Get Files Node: Error getting file from SFTP: ${error}`);
		throw {
			"code": "SFTP_GET_FILE_ERROR",
			"message": "Error getting file from SFTP",
			"stackTrace": error
		}
	}
}