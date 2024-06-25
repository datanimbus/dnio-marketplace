const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB UpdateOne Node: Invoked!");
    try {
        logger.trace('MongoDB updateOne Node: Input - ${JSON.stringify(inputData)}');

        if (_.isEmpty(inputData.filter)) {
            throw new Error('Filter is empty');
        }
        if (_.isEmpty(inputData.update)) {
            throw new Error('Update data is empty');
        }

        const result = await connectorData.db.collection(inputData.collection).updateOne(inputData.filter, { $set: inputData.update });

        logger.trace('MongoDB UpdateOne Node: Update result - ${JSON.stringify(result)}');
        return { matched_count: result.matchedCount, modified_count: result.modifiedCount };
    } catch (error) {
        logger.error(`MongoDB Find Node: Error updating documents in MongoDB: ${error}`);
        throw {
            "code": "MONGODB_UPDATE_ONE_ERROR",
            "message": "Error updating a document in MongoDB",
            "stackTrace": error
        };
    }
};