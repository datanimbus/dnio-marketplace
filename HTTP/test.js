const makeRequest = require('./index.js');

const PORT = 3001;
const connectorData = {
    protocol: 'http',
    host: 'localhost',
    port: PORT
};

async function runTests() {
    // Test GET request
    const getInputData = {
        method: 'GET',
        path: '/get',
        query: {},
        data: '',
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
        throwErrorOn4xx: true
    };

    try {
        const getResponse = await makeRequest(getInputData, connectorData);
        console.log('GET Response:', getResponse.toString());
    } catch (error) {
        console.error('GET Error:', error);
    }

    // Test PUT request
    const putInputData = {
        method: 'PUT',
        path: '/update',
        query: {},
        data: JSON.stringify({ key: 'newValue' }),
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
        throwErrorOn4xx: true
    };

    try {
        const putResponse = await makeRequest(putInputData, connectorData);
        console.log('PUT Response:', putResponse.toString());
    } catch (error) {
        console.error('PUT Error:', error);
    }

    // Test POST request
    const postInputData = {
        method: 'POST',
        path: '/update',
        query: {},
        data: JSON.stringify({ key: 'postValue' }),
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
        throwErrorOn4xx: true
    };

    try {
        const postResponse = await makeRequest(postInputData, connectorData);
        console.log('POST Response:', postResponse.toString());
    } catch (error) {
        console.error('POST Error:', error);
    }

    // Test DELETE request
    const deleteInputData = {
        method: 'DELETE',
        path: '/delete',
        query: {},
        data: JSON.stringify({ key: 'deleteValue' }),
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
        throwErrorOn4xx: true
    };

    try {
        const deleteResponse = await makeRequest(deleteInputData, connectorData);
        console.log('DELETE Response:', deleteResponse.toString());
    } catch (error) {
        console.error('DELETE Error:', error);
    }

    // Close the server
    process.exit();
}

runTests();
