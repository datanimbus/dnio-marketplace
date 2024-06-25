const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB DeleteMany Node: Invoked!");
    try {
        logger.trace(`MongoDB DeleteMany Node: Input - ${JSON.stringify(inputData)}`);

        if (_.isEmpty(inputData.filter)) {
            throw new Error('Filter is empty');
        }

        const result = await connectorData.db.collection(inputData.collection).deleteMany(inputData.filter);

        logger.trace(`MongoDB DeleteMany Node: Delete result - ${JSON.stringify(result)}`);
        return { deleted_count: result.deletedCount };
    } catch (error) {
        logger.error(`MongoDB DeleteMany Node: Error deleting documents from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_DELETE_MANY_ERROR",
            "message": "Error deleting documents from MongoDB",
            "stackTrace": error
        };
    }
};
