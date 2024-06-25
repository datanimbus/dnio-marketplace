const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
	logger.trace("MongoDB FindOne Node: Invoked!");
	try {
		logger.trace(`MongoDB FindOne Node: Input - ${JSON.stringify(inputData)}`);
		if (!inputData.collection) {
			logger.error(`MongoDB FindOne Node: Collection name is required`);
			throw {
				"code": "MONGODB_FIND_ONE_ERROR",
				"message": "Collection name is required"
			}
		}
		const cursor = connectorData.db.collection(inputData.collection).findOne(inputData.filter);
		if (!_.isEmpty(inputData.project)) {
			cursor.project(inputData.project);
		}
		if (!_.isEmpty(inputData.sort)) {
			cursor.sort(inputData.sort);
		}
		if (inputData.offset) {
			cursor.skip(inputData.offset);
		}
		const result = await cursor;
		logger.trace(`MongoDB FindOne Node: Find response : ${JSON.stringify(result)}`);
		return result;
	} catch (error) {
		logger.error(`MongoDB FindOne Node: Error finding one document from MongoDB: ${error}`);
		throw {
			"code": "MONGODB_FIND_ONE_ERROR",
			"message": "Error finding one document from MongoDB",
			"stackTrace": error
		}
	}
}