const { getLogger } = require('log4js');

let logger = getLogger(`[MongoDB]`);
logger.level = "TRACE"
global.logger = logger;

(async () => {
	let connectorData = {
		connectionString: "mongodb://localhost:30017?directConnection=true",
		database: "dnio-marketplace",
		// tls: true,
		// certName: "ca.pem",
		// cert: "cert"
	};
	// TODO: test with tls, certName and cert
	connectorData = await require('./connector')(connectorData);

	// NODE INSERT ONE
	let inputData = {
		data: { "name": "Insert One", "gender": "Male" },
		collection: "test"
	};
	let output = await require('./node.insertOne')(connectorData, inputData);
	logger.info(`InsertOne output : ${JSON.stringify(output)}`);

	// NODE INSERT MANY
	inputData = {
		data: [
			{ "name": "Insert Many 01", "gender": "Male" },
			{ "name": "Insert Many 02", "gender": "Female" },
			{ "name": "Insert Many 03", "gender": "Male" },
		],
		collection: "test"
	};
	output = await require('./node.insertMany')(connectorData, inputData);
	logger.info(`InsertMany output : ${JSON.stringify(output)}`);

	// NODE FIND ONE
	inputData = {
		filter: {},
		project: {},
		sort: {},
		offset: 0,
		collection: "test"
	};
	output = await require('./node.findOne')(connectorData, inputData);
	logger.info(`FindOne output : ${JSON.stringify(output)}`);

})()