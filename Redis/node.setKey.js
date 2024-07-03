let logger = global.logger;

module.exports = async (connectorData, inputData) => {
    logger.trace("Redis Set Value Node: Invoked!");
    try {
        logger.trace(`Redis Set Value Node: Input - ${JSON.stringify(inputData)}`);
		const setArguments = [inputData.key, inputData.value];
		if (inputData.expiry) {
			setArguments.push('EX', inputData.expiry);
		}
        await connectorData.client.set(...setArguments);
    } catch (error) {
        logger.error(`Redis Set Value Node: Error setting value in Redis: ${error}`);
        throw {
            "code": "REDIS_SET_KEY_ERROR",
            "message": "Error setting value in Redis",
            "stackTrace": error
        };
    }
};