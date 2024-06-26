const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB Find Node: Invoked!");
    try {
        logger.trace(`MongoDB Find Node: Input - ${JSON.stringify(inputData)}`);

        if (!inputData.collection) {
            logger.error('MongoDB Find Node: Collection name is missing');
            throw new Error('Collection name is missing');
        }

        const cursor = connectorData.db.collection(inputData.collection).find(inputData.filter || {});

        if (!_.isEmpty(inputData.project)) {
            cursor.project(inputData.project);
        }
        if (!_.isEmpty(inputData.sort)) {
            cursor.sort(inputData.sort);
        }
        if (inputData.offset) {
            cursor.skip(inputData.offset);
        }
        if (inputData.limit) {
            cursor.limit(inputData.limit);
        }

        const result = await cursor.toArray();
        logger.trace(`MongoDB Find Node: Find response - ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        logger.error(`MongoDB Find Node: Error finding documents from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_FIND_ERROR",
            "message": "Error finding documents from MongoDB",
            "stackTrace": error
        };
    }
};
