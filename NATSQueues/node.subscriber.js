const { StringCodec } = require('nats');
const log4js = require('log4js');

const logger = log4js.getLogger();

const subscribeMessage = async (nc, subject, queueGroup, subscriberId) => {
    logger.trace(`NATS Subscriber ${subscriberId}: Subscribe Message Invoked!`);

    try {
        const sub = nc.subscribe(subject, { queue: queueGroup });
        const sc = StringCodec();

        (async () => {
            for await (const msg of sub) {
                logger.info(`NATS Subscriber ${subscriberId}: Received message in queue group "${queueGroup}": ${sc.decode(msg.data)}`);
            }
        })();

        logger.info(`NATS Subscriber ${subscriberId}: Subscribed to subject: ${subject} in queue group: ${queueGroup}`);
        return sub;
    } catch (error) {
        logger.error(`NATS Subscriber ${subscriberId}: Error subscribing to subject: ${error}`);
        throw error;
    }
};

module.exports = { subscribeMessage };
