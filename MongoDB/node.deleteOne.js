const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB DeleteOne Node: Invoked!");
    try {
        logger.trace(`MongoDB DeleteOne Node: Input - ${JSON.stringify(inputData)}`);

        if (_.isEmpty(inputData.filter)) {
            throw new Error('Filter is empty');
        }

        const result = await connectorData.db.collection(inputData.collection).deleteOne(inputData.filter);

        logger.trace(`MongoDB DeleteOne Node: Delete result - ${JSON.stringify(result)}`);
        return { deleted_count: result.deletedCount };
    } catch (error) {
        logger.error(`MongoDB DeleteOne Node: Error deleting a document from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_DELETE_ONE_ERROR",
            "message": "Error deleting a document from MongoDB",
            "stackTrace": error
        };
    }
};
