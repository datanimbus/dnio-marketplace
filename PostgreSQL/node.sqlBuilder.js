let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("PostgreSQL SQL Builder Node: Invoked!");
	try {
		logger.trace(`PostgreSQL SQL Builder Node: input - ${JSON.stringify(inputData)}`);
		if (!inputData.query) {
			throw { message: "SQL Query is required." };
		}
		const values = inputData.values ?? [];
		const result = await connectorData.pgCon.query(inputData.query, values);
		logger.trace(`PostgreSQL SQL Builder Node: SQL Builder successful`);
		logger.trace(`PostgreSQL SQL Builder Node: SQL Builder response : ${JSON.stringify(result)}`);
		return { rowCount: result.rowCount, rows: result.rows };
	} catch (error) {
		logger.error(`PostgreSQL SQL Builder Node: Error executing SQL Builder query in PostgreSQL: ${error}`);
		throw {
			"code": "POSTGRESQL_SQL_BUILDER_ERROR",
			"message": "Error executing SQL Builder query in PostgreSQL",
			"stackTrace": error
		}
	}
}