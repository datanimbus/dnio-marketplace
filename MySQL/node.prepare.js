let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("MySQL Prepare Node: Invoked!");
	try {
		logger.trace(`MySQL Prepare Node: input - ${JSON.stringify(inputData)}`);
		const [results, fields] = await connectorData.MySQLCon.execute(inputData.query, inputData.values);
		logger.trace(`MySQL Prepare Node: Prepare successful`);
		logger.trace(`MySQL Prepare Node: Prepare response : ${JSON.stringify(results)}`);
		return results;	
	} catch (error) {
		logger.error(`MySQL Prepare Node: Error executing prepare query in MySQL: ${error}`);
		throw {
			"code": "MySQL_PREPARE_ERROR",
			"message": "Error executing prepare query in MySQL",
			"stackTrace": error
		}
	}
}