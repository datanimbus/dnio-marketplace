let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("MongoDB InsertMany Node: Invoked!");
	try {
		logger.trace(`MongoDB InsertMany Node: input - ${JSON.stringify(inputData)}`);
		if (!inputData.collection) {
			logger.error(`MongoDB InsertMany Node: Collection name is required`);
			throw new Error("Collection name is required")
		}
		const result = await connectorData.db.collection(inputData.collection).insertMany(inputData.data);
		logger.debug(`MongoDB InsertMany Node: Insert successful`);
		logger.trace(`MongoDB InsertMany Node: Insert response : ${JSON.stringify(result)}`);
		delete result.acknowledged;
		result._insertedIds = [];
		Object.keys(result.insertedIds).forEach((key) => {
			result._insertedIds.push(result.insertedIds[key]);
			delete result.insertedIds[key];
		});
		result.insertedIds = result._insertedIds;
		delete result._insertedIds;
		return result;
	} catch (error) {
		logger.error(`MongoDB InsertMany Node: Error inserting to MongoDB: ${error}`);
		throw {
			"code": "MONGODB_INSERT_MANY_ERROR",
			"message": "Error inserting multiple documents into MongoDB",
			"stackTrace": error
		}
	}
}