const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB UpdateOne Node: Invoked!");
    try {
        logger.trace(`MongoDB UpdateOne Node: Input - ${JSON.stringify(inputData)}`);

        if (!inputData.collection) {
            logger.error('MongoDB UpdateOne Node: Collection name is missing');
            throw new Error('Collection name is missing');
        }

        if (_.isEmpty(inputData.filter)) {
            logger.error('MongoDB UpdateOne Node: Filter is empty');
            throw new Error('Filter is empty');
        }

        if (_.isEmpty(inputData.update)) {
            logger.error(`MongoDB UpdateOne Node: Update data is empty - ${JSON.stringify(inputData.update)}`);
            throw new Error('Update data is empty');
        }

        const options = { upsert: inputData.upsert || false, returnDocument: 'after' }; 
        const result = await connectorData.db.collection(inputData.collection).findOneAndUpdate(inputData.filter, { $set: inputData.update }, options);

        logger.trace(`MongoDB UpdateOne Node: Raw result - ${JSON.stringify(result)}`);

        if (result) {
            logger.trace(`MongoDB UpdateOne Node: Updated document - ${JSON.stringify(result)}`);
            return { updatedDocument: result };
        } else {
            logger.error('MongoDB UpdateOne Node: No document was updated');
            throw new Error('No document was updated');
        }
    } catch (error) {
        logger.error(`MongoDB UpdateOne Node: Error updating document in MongoDB: ${error}`);
        throw {
            "code": "MONGODB_UPDATE_ONE_ERROR",
            "message": "Error updating document in MongoDB",
            "stackTrace": error
        };
    }
};
