let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("MySQL SQL Builder: Invoked!");
	try {
		logger.trace(`MySQL SQL Builder: input - ${JSON.stringify(inputData)}`);
		if (!inputData.query) {
			logger.error(`MySQL SQL Builder: SQL Query is required.`);
			throw { message: "SQL Query is required." };
		}
		const values = inputData.values ?? [];

		const [result] = await connectorData.client.execute(inputData.query, values);
		logger.trace(`MySQL SQL Builder: SQL Builder successful`);
		logger.trace(`MySQL SQL Builder: SQL Builder response : ${JSON.stringify(result)}`);
		return result;
	} catch (error) {
		logger.error(`MySQL SQL Builder: Error executing SQL Builder query in MySQL: ${error}`);
		throw {
			"code": "MYSQL_SQL_BUILDER_ERROR",
			"message": "Error executing SQL Builder query in MySQL",
			"stackTrace": error
		}
	}
}