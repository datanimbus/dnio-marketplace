const { getLogger } = require('log4js');

let logger = getLogger(`[Redis]`);
logger.level = "TRACE"
global.logger = logger;

(async () => {
	let connectorData = {
		connectionString: "redis://localhost:6379",
	};
	connectorData = await require('./connector')(connectorData);

	// TEST SET VALUE
	let inputData = {
		key: 'name',
		value: 'Messi',
	};
	await require('./node.setKey')(connectorData, inputData);

	// TEST GET VALUE FOR EXISTING KEY
	inputData = {
		key: 'name',
	};
	const getValueResults = await require('./node.getKey')(connectorData, inputData);
	logger.info(`Set Value result : ${JSON.stringify(getValueResults)}`);

	// TEST GET VALUE FOR NON-EXISTING KEY
	inputData = {
		key: 'age',
	};
	const getValueResults2 = await require('./node.getKey')(connectorData, inputData);
	logger.info(`Set Value result : ${JSON.stringify(getValueResults2)}`);

	// TEST SET KEY WITH EXPIRY
	inputData = {
		key: 'age',
		value: '33',
		expiry: 5,
	}
	await require('./node.setKey')(connectorData, inputData);

	logger.info(`Delayed for 12 seconds.`);
	setTimeout(async () => {

		// TEST GET VALUE FOR EXPIRED KEY
		inputData = {
			key: 'age',
		};
		const getValueResults3 = await require('./node.getKey')(connectorData, inputData);
		logger.info(`Set Value result : ${JSON.stringify(getValueResults3)}`);
	}, 12000);

	// TESTING DELETION OF KEY
	// SET KEY
	inputData = {
		key: 'name',
		value: 'Messi',
	};
	await require('./node.setKey')(connectorData, inputData);

	// GET KEY
	inputData = {
		key: 'name',
	};
	const getKeyResults = await require('./node.getKey')(connectorData, inputData);
	logger.info(`Get Key result : ${JSON.stringify(getKeyResults)}`);

	// DELETE KEY
	inputData = {
		key: 'name',
	};
	await require('./node.deleteKey')(connectorData, inputData);

	// GET KEY AFTER DELETE
	inputData = {
		key: 'name',
	};
	const getKeyResults2 = await require('./node.getKey')(connectorData, inputData);
	logger.info(`Get Key result : ${JSON.stringify(getKeyResults2)}`);

})()