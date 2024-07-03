let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("Redis Delete Value Node: Invoked!");
    try {
        logger.trace(`Redis Delete Value Node: Input - ${JSON.stringify(inputData)}`);
        await connectorData.client.del(inputData.key);
		logger.trace(`Redis Delete Value Node: Delete key successful.`);
    } catch (error) {
        logger.error(`Redis Delete Value Node: Error deleting key in Redis: ${error}`);
        throw {
            "code": "REDIS_DELETE_KEY_ERROR",
            "message": "Error deleting key in Redis",
            "stackTrace": error
        };
    }
};