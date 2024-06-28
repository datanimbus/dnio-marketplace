let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("MongoDB InsertOne Node: Invoked!");
	try {
		logger.trace(`MongoDB InsertOne Node: input - ${JSON.stringify(inputData)}`);
		if (!inputData.collection) {
			logger.error(`MongoDB InsertOne Node: Collection name is required`);
			throw new Error("Collection name is required")
		}
		const result = await connectorData.db.collection(inputData.collection).insertOne(inputData.data);
		logger.debug(`MongoDB InsertOne Node: Insert successful`);
		logger.trace(`MongoDB InsertOne Node: Insert response : ${JSON.stringify(result)}`);
		return { insertedId: result.insertedId };
	} catch (error) {
		logger.error(`MongoDB InsertOne Node: Error inserting to MongoDB: ${error}`);
		throw {
			"code": "MONGODB_INSERT_ONE_ERROR",
			"message": "Error inserting to MongoDB",
			"stackTrace": error
		}
	}
}