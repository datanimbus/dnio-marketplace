import { S3Client } from '@aws-sdk/client-s3';
import log4js from 'log4js';

// Configure log4js
log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'application.log' }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'trace' }
    }
});

const logger = log4js.getLogger();

export const s3Connector = async (connectorData) => {
    logger.trace("S3 Connector: Invoked!");
    logger.trace(`S3 Connector: Connector Data: ${JSON.stringify(connectorData)}`);
    logger.trace(`S3 Connector: Connecting to S3 with region: ${connectorData.region}`);
    
    try {
        const s3Client = new S3Client({ 
            region: connectorData.region,
            credentials: {
                accessKeyId: connectorData.accessKeyId,
                secretAccessKey: connectorData.secretAccessKey
            }
        });
        logger.info("S3 Connector: Connected to S3");
        return s3Client;
    } catch (error) {
        logger.error(`S3 Connector: Error connecting to S3: ${error}`);
        throw {
            code: "S3_CONNECTOR_ERROR",
            message: "Error connecting to S3",
            stackTrace: error
        };
    }
};
