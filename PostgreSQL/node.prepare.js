let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("PostgreSQL Prepare Node: Invoked!");
	try {
		logger.trace(`PostgreSQL Prepare Node: input - ${JSON.stringify(inputData)}`);
		const result = await connectorData.pgCon.query(inputData.query, inputData.values);
		logger.trace(`PostgreSQL Prepare Node: Prepare successful`);
		logger.trace(`PostgreSQL Prepare Node: Prepare response : ${JSON.stringify(result)}`);
		return result;	
	} catch (error) {
		logger.error(`PostgreSQL Prepare Node: Error executing prepare query in PostgreSQL: ${error}`);
		throw {
			"code": "PostgreSQL_PREPARE_ERROR",
			"message": "Error executing prepare query in PostgreSQL",
			"stackTrace": error
		}
	}
}