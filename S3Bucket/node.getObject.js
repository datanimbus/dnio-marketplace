import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import _ from 'lodash';
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

export const getObject = async (s3Client, bucketName, objName) => {
    logger.trace("S3 Bucket getObject Node: Invoked!");

    try {
        logger.trace(`S3 Bucket getObject Node: Input - ${JSON.stringify({ bucketName, objName })}`);

        // Check if object exists
        await s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: objName }));
        logger.trace(`Object "${objName}" found in bucket "${bucketName}". Proceeding to get object.`);

        const { Body } = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: objName }));
        const bodyContents = await streamToString(Body);
        logger.trace(`Successfully retrieved object: ${objName} from bucket: ${bucketName}`);
        
        logger.info(`Object content: ${bodyContents}`);
        return bodyContents;
    } catch (err) {
        if (err.name === 'NotFound') {
            logger.error(`S3 Bucket getObject: Object "${objName}" not found in bucket "${bucketName}".`);
        } else {
            logger.error(`S3 Bucket getObject: Error getting object: ${err.message}`);
        }
        throw err;
    }
};

const streamToString = (stream) => 
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
