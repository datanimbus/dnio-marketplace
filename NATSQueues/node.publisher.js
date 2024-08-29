const { StringCodec } = require('nats');
const log4js = require('log4js');

const logger = log4js.getLogger();

const publishMessage = async (nc, subject, message) => {
    logger.trace("NATS Publisher: Publish Message Invoked!");

    try {
        const sc = StringCodec();
        nc.publish(subject, sc.encode(message));
        logger.info(`NATS Publisher: Message published to subject: ${subject}`);
    } catch (error) {
        logger.error(`NATS Publisher: Error publishing message: ${error}`);
        throw error;
    }
};

module.exports = { publishMessage };
