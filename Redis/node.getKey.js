let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("Redis Get Value Node: Invoked!");
    try {
        logger.trace(`Redis Get Value Node: Input - ${JSON.stringify(inputData)}`);
        const result = await connectorData.client.get(inputData.key);
        logger.trace(`Redis Get Value Node: Get Value result - ${result}`);
		return result;
    } catch (error) {
        logger.error(`Redis Get Value Node: Error getting value in Redis: ${error}`);
        throw {
            "code": "REDIS_GET_KEY_ERROR",
            "message": "Error getting value in Redis",
            "stackTrace": error
        };
    }
};