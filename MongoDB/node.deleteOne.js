const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB DeleteOne Node: Invoked!");
    try {
        logger.trace(`MongoDB DeleteOne Node: Input - ${JSON.stringify(inputData)}`);

        if (!inputData.collection) {
            logger.error('MongoDB DeleteOne Node: Collection name is missing');
            throw new Error('Collection name is missing');
        }

        if (_.isEmpty(inputData.filter)) {
            logger.error('MongoDB DeleteOne Node: Filter is empty');
            throw new Error('Filter is empty');
        }

        const result = await connectorData.db.collection(inputData.collection).deleteOne(inputData.filter);

        logger.trace(`MongoDB DeleteOne Node: Delete result - ${JSON.stringify(result)}`);
        return { deletedCount: result.deletedCount };
    } catch (error) {
        logger.error(`MongoDB DeleteOne Node: Error deleting document from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_DELETE_ONE_ERROR",
            "message": "Error deleting document from MongoDB",
            "stackTrace": error
        };
    }
};
