import express from 'express';
import 'dotenv/config';
import { s3Connector } from './connector.js';
import { putObject } from './node.putObject.js';
import { getObject } from './node.getObject.js';
import { deleteObject } from './node.deleteObject.js';
import { updateObject } from './node.updateObject.js';

// Set up express and logger
const app = express();
const port = 3000;

app.use(express.json());

const connectorData = {
    region: process.env.AWS_REGION || 'us-east-2'
};

let s3Client;

try {
    s3Client = s3Connector(connectorData);
} catch (error) {
    console.error(`Failed to initialize S3 Client: ${error.message}`);
    process.exit(1);
}

// Test configuration
const config = {
    region: "us-east-2",
    bucketName: "test-bucket-1721689066727",
    fileName: "example-file.txt",
    newFileName: "new-test-file.txt",
    fileContent: "Hello, this is a new file content!",
    updatedFileContent: "This is the updated file content!"
};

// Test PutObject
async function testPutObject() {
    try {
        const data = await putObject(s3Client, config.bucketName, config.fileName, config.fileContent);
        console.log('PutObject Test: Object uploaded successfully', data);
    } catch (err) {
        console.error('PutObject Test: Error uploading object:', err.message);
    }
}

// Test GetObject
async function testGetObject() {
    try {
        const data = await getObject(s3Client, config.bucketName, config.fileName);
        console.log('GetObject Test: Object retrieved successfully', data);
    } catch (err) {
        console.error('GetObject Test: Error retrieving object:', err.message);
    }
}

// Test UpdateObject
async function testUpdateObject() {
    try {
        const data = await updateObject(s3Client, config.bucketName, config.fileName, config.updatedFileContent);
        console.log('UpdateObject Test: Object updated successfully', data);
    } catch (err) {
        console.error('UpdateObject Test: Error updating object:', err.message);
    }
}

// Test DeleteObject
async function testDeleteObject() {
    try {
        const data = await deleteObject(s3Client, config.bucketName, config.fileName);
        console.log('DeleteObject Test: Object deleted successfully', data);
    } catch (err) {
        console.error('DeleteObject Test: Error deleting object:', err.message);
    }
}

// Run all tests
async function runTests() {
    await testPutObject();
    await testGetObject();
    await testUpdateObject();
    await testDeleteObject();
}

runTests().then(() => {
    console.log('All tests completed.');
}).catch(err => {
    console.error('Error during tests:', err.message);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
