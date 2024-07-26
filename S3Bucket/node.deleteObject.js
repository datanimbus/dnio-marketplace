import { DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
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

export const deleteObject = async (s3Client, bucketName, objName) => {
    logger.trace("S3 Bucket deleteObject Node: Invoked!");

    try {
        logger.trace(`S3 Bucket deleteObject Node: Input - ${JSON.stringify({ bucketName, objName })}`);

        // Check if object exists
        await s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: objName }));
        logger.trace(`Object "${objName}" found in bucket "${bucketName}". Proceeding to delete object.`);

        const params = {
            Bucket: bucketName,
            Key: objName
        };

        // Delete the object
        const data = await s3Client.send(new DeleteObjectCommand(params));
        logger.trace(`Successfully deleted object: ${objName} from bucket: ${bucketName}`);
        return data;
    } catch (err) {
        if (err.name === 'NotFound') {
            logger.error(`S3 Bucket deleteObject: Object "${objName}" not found in bucket "${bucketName}".`);
        } else {
            logger.error(`S3 Bucket deleteObject: Error deleting object: ${err.message}`);
        }
        throw err;
    }
};
