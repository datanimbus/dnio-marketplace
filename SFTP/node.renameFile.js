let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("SFTP Rename File Node: Invoked!");
	try {
		logger.trace(`SFTP Rename File Node: input - ${JSON.stringify(inputData)}`);
		logger.info(`SFTP Rename File Node: Renaming file ${inputData.sourceFilePath} to ${inputData.targetFilePath}`);
		const result = await connectorData.client.rename(inputData.sourceFilePath, inputData.targetFilePath);
		logger.trace(`SFTP Rename Files Node: Rename File successful`);
		logger.trace(`SFTP Rename Files Node: Rename File response : ${JSON.stringify(result)}`);
		return { result: result };
	} catch (error) {
		logger.error(`SFTP Rename Files Node: Error renamin file in SFTP: ${error}`);
		throw {
			"code": "SFTP_RENAME_FILE_ERROR",
			"message": "Error renaming file in SFTP",
			"stackTrace": error
		}
	}
}