const { getLogger } = require('log4js');

let logger = getLogger(`[MongoDB]`);
logger.level = "TRACE"
global.logger = logger;

(async () => {
	let connectorData = {
		connectionString: "mongodb://localhost:27017/?directConnection=true",
		database: "mydb",
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
			{ "name": "Insert Many 03", "gender": "Female" },
		],
		collection: "test"
	};
	output = await require('./node.insertMany')(connectorData, inputData);
	logger.info(`InsertMany output : ${JSON.stringify(output)}`);


	// NODE DELETEONE
	inputData = {
		filter: {gender: "Male"},
		project: {},
		sort: {},
		offset: 0,
		collection: "test"
	};
	output = await require('./node.deleteOne')(connectorData, inputData);
	logger.info(`DeleteOne output : ${JSON.stringify(output)}`);

	// NODE DELETEONE
	inputData = {
		filter: {gender: "Female"},
		project: {},
		sort: {},
		offset: 0,
		collection: "test"
	};
	output = await require('./node.deleteOne')(connectorData, inputData);
	logger.info(`DeleteOne output : ${JSON.stringify(output)}`);

	//NODE COUNT
	inputData = {
		filter: {gender: "Female"},
		project: {},
		sort: {},
		offset: 0,
		collection: "test"
	};
	output = await require('./node.count')(connectorData, inputData);
	logger.info(`count output : ${JSON.stringify(output)}`);

	// NODE AGGREGATE
	 inputData = {
		pipeline: [
			{ $group: { _id: "$gender", count: { $sum: 1 } } }
		],
		collection: "test"
	};
	output = await require('./node.aggregate')(connectorData, inputData);
	logger.info(`Aggregate output : ${JSON.stringify(output)}`);

	//NODE FIND
	inputData = {
		filter: { name: "Insert Many 01" },
		collection: "test"
	};
	output = await require('./node.find')(connectorData, inputData);
	logger.info(`Find output : ${JSON.stringify(output)}`);

	//NODE FINDONE
	inputData = {
		filter: { name: "Insert Many 03" },
		collection: "test"
	};
	output = await require('./node.findOne')(connectorData, inputData);
	logger.info(`FindOne output : ${JSON.stringify(output)}`);

	// NODE UPDATE
	inputData = {
		filter: { name: "Insert Many 02" },
		update: { gender: "Female" },
		collection: "test"
	};
	output = await require('./node.updateOne')(connectorData, inputData);
	logger.info(`Update output : ${JSON.stringify(output)}`);

	 // NODE UPDATEMANY
	 inputData = {
		filter: { name: "Insert Many 02" },
		update: { gender: "Male"},
		collection: "test"
	};
	output = await require('./node.updateOne')(connectorData, inputData);
	logger.info(`UpdateMany output : ${JSON.stringify(output)}`);
	
})()