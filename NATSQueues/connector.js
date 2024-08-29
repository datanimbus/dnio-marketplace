const { connect, StringCodec } = require('nats');
const log4js = require('log4js');

// Configure log4js
log4js.configure({
    appenders: { console: { type: 'console' }, file: { type: 'file', filename: 'nats-application.log' } },
    categories: { default: { appenders: ['console', 'file'], level: 'trace' } }
});

const logger = log4js.getLogger();

let nc;

const natsConnector = async (connectionString) => {
    logger.trace("NATS Connector: Invoked!");
    try {
        nc = await connect({ servers: connectionString });
        logger.info("NATS Connector: Connected to NATS");

        nc.closed().then(err => {
            if (err) {
                logger.error(`NATS Connector: Error: ${err.message}`);
            }
            logger.info("NATS Connector: Connection closed");
        });

        return nc;
    } catch (error) {
        logger.error(`NATS Connector: Error connecting to NATS: ${error}`);
        throw {
            code: "NATS_CONNECTOR_ERROR",
            message: "Error connecting to NATS",
            stackTrace: error
        };
    }
};

module.exports = { natsConnector, nc, StringCodec };
