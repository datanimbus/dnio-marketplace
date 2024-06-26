const _ = require('lodash');
let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("MongoDB Aggregate Node: Invoked!");
    try {
        logger.trace(`MongoDB Aggregate Node: Input - ${JSON.stringify(inputData)}`);

        if (_.isEmpty(inputData.pipeline)) {
            throw new Error('Pipeline is empty');
            logger.error('MongoDB Aggregate Node: Pipeline is empty');

        }

        const result = await connectorData.db.collection(inputData.collection).aggregate(inputData.pipeline).toArray();

        logger.trace(`MongoDB Aggregate Node: Aggregate result - ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        logger.error(`MongoDB Aggregate Node: Error aggregating documents from MongoDB: ${error}`);
        throw {
            "code": "MONGODB_AGGREGATE_ERROR",
            "message": "Error aggregating documents from MongoDB",
            "stackTrace": error
        };
    }
};
