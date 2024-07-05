let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("SFTP Delete File Node: Invoked!");
	try {
		logger.trace(`SFTP Delete File Node: input - ${JSON.stringify(inputData)}`);
		const result = await connectorData.client.delete(inputData.filePath);
		logger.trace(`SFTP Delete Files Node: Delete File successful`);
		logger.trace(`SFTP Delete Files Node: Delete File response : ${JSON.stringify(result)}`);
		return { result : result };
	} catch (error) {
		logger.error(`SFTP Delete Files Node: Error deleting file in SFTP: ${error}`);
		throw {
			"code": "SFTP_DELETE_FILE_ERROR",
			"message": "Error deleting file in SFTP",
			"stackTrace": error
		}
	}
}