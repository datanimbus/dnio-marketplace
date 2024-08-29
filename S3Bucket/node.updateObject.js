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

export const updateObject = async (s3Client, bucketName, key, newContent) => {
    logger.trace("S3 Bucket updateObject Node: Invoked!");

    // Input validation
    if (!key) {
        logger.error("S3 Bucket updateObject: Missing 'key' parameter.");
        throw new Error("Missing 'key' parameter.");
    }
    if (!newContent) {
        logger.error("S3 Bucket updateObject: Missing 'newContent' parameter.");
        throw new Error("Missing 'newContent' parameter.");
    }

    try {
        logger.trace(`S3 Bucket updateObject Node: Input - ${JSON.stringify({ bucketName, key, newContent })}`);

        // Define parameters for the PutObjectCommand
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: newContent,
            Metadata: {
                "Content-Type": "text/plain" // Set appropriate content type
            }
        };

        // Debugging output to check params
        logger.trace(`Updating S3 object with Key: ${params.Key}, Body length: ${params.Body.length}`);

        // Upload the updated object
        const data = await s3Client.send(new PutObjectCommand(params));
        logger.trace(`Successfully updated object: ${key} in bucket: ${bucketName}`);
        return data;
    } catch (err) {
        logger.error(`S3 Bucket updateObject: Error updating object: ${err.message}`);
        throw err;
    }
};
