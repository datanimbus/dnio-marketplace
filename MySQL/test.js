const { getLogger } = require('log4js');

let logger = getLogger(`[MySQL]`);
logger.level = "TRACE"
global.logger = logger;

(async () => {
	let connectorData = {
		user: 'root',
		host: '0.0.0.0',
		database: 'dnio-marketpalce',
		password: '123',
		port: '3306',
	};
	
	connectorData = await require('./connector')(connectorData);

	// TEST CONNECTION
	let inputData = {
		query: 'SELECT 1 + 1 AS solution',
		values: [],
	};
	const connectionResults = await require('./node.sqlBuilder')(connectorData, inputData);
	logger.info(`Test Connection result : ${JSON.stringify(connectionResults)}`);

	// TEST CREATE A RECORD
	inputData = {
		query: 'INSERT INTO my_table (name) VALUES (?)',
		values: ['John Doe'],
	};
	const createResults = await require('./node.sqlBuilder')(connectorData, inputData);
	logger.info(`Create a record result : ${JSON.stringify(createResults)}`);

	// TEST READ A RECORD
	inputData = {
		query: 'SELECT * FROM my_table WHERE name = ?',
		values: ['Jane Doe'],
	};
	const readResults = await require('./node.sqlBuilder')(connectorData, inputData);
	logger.info(`Read a record result : ${JSON.stringify(readResults)}`);

	// TEST UPDATE A RECORD
	inputData = {
		query: 'UPDATE my_table SET name = ? WHERE name = ?',
		values: ['Jane Doe', 'John Doe'],
	};
	const updateResults = await require('./node.sqlBuilder')(connectorData, inputData);
	logger.info(`Update a record result : ${JSON.stringify(updateResults)}`);
	
	// // TEST DELETE A RECORD
	inputData = {
		query: 'DELETE FROM my_table WHERE id = ?',
		values: ['1'],
	};
	const deleteResults = await require('./node.sqlBuilder')(connectorData, inputData);
	logger.info(`Delete a record result : ${JSON.stringify(deleteResults)}`);
})()