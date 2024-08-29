import { PutObjectCommand } from '@aws-sdk/client-s3';
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

export const putObject = async (s3Client, bucketName, key, body) => {
    logger.trace("S3 Bucket putObject Node: Invoked!");

    // Input validation
    if (!key) {
        logger.error("S3 Bucket putObject: Missing 'key' parameter.");
        throw new Error("Missing 'key' parameter.");
    }
    if (!body) {
        logger.error("S3 Bucket putObject: Missing 'body' parameter.");
        throw new Error("Missing 'body' parameter.");
    }

    try {
        logger.trace(`S3 Bucket putObject Node: Input - ${JSON.stringify({ bucketName, key, body })}`);

        // Define parameters for the PutObjectCommand
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: body,
            Metadata: {
                "Content-Type": "text/plain" // Set appropriate content type
            }
        };

        // Debugging output to check params
        logger.trace(`Uploading to S3 with Key: ${params.Key}, Body length: ${params.Body.length}`);

        // Upload the object
        const data = await s3Client.send(new PutObjectCommand(params));
        logger.trace(`Successfully uploaded object: ${key} to bucket: ${bucketName}`);
        return data;
    } catch (err) {
        logger.error(`S3 Bucket putObject: Error uploading object: ${err.message}`);
        throw err;
    }
};
