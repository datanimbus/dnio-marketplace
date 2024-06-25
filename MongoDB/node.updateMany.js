const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB UpdateMany Node: Invoked!");
    try {
        logger.trace(`MongoDB UpdateMany Node: Input - ${JSON.stringify(inputData)}`);

        if (_.isEmpty(inputData.filter)) {
            throw new Error('Filter is empty');
        }

        if (_.isEmpty(inputData.update)) {
            throw new Error('Update data is empty');
        }

        const result = await connectorData.db.collection(inputData.collection).updateMany(inputData.filter, { $set: inputData.update });

        logger.trace(`MongoDB UpdateMany Node: Update result - ${JSON.stringify(result)}`);
        return { matched_count: result.matchedCount, modified_count: result.modifiedCount };
    } catch (error) {
        logger.error(`MongoDB UpdateMany Node: Error updating documents in MongoDB: ${error}`);
        throw {
            "code": "MONGODB_UPDATE_MANY_ERROR",
            "message": "Error updating documents in MongoDB",
            "stackTrace": error
        };
    }
};
