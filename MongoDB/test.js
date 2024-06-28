const { getLogger } = require('log4js');

let logger = getLogger(`[MongoDB]`);
logger.level = "TRACE";
global.logger = logger;

(async () => {
    let connectorData = {
        connectionString: "mongodb://localhost:30017/?directConnection=true",
        database: "dnio-marketplace",
        // tls: true,
        // certName: "ca.pem",
        // cert: "cert"
    };
    // TODO: test with tls, certName and cert
    connectorData = await require('./connector')(connectorData);

    try {
        // NODE INSERT ONE
        let inputData = {
            data: { "name": "Insert One", "gender": "Male" },
            collection: "test"
        };
        let output = await require('./node.insertOne')(connectorData, inputData);
        logger.info(`InsertOne output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`InsertOne error: ${error.stack}`);
    }

    try {
        // NODE INSERT MANY
        let inputData = {
            data: [
                { "name": "Insert Many 01", "gender": "Male" },
                { "name": "Insert Many 02", "gender": "Female" },
                { "name": "Insert Many 03", "gender": "Female" },
            ],
            collection: "test"
        };
        let output = await require('./node.insertMany')(connectorData, inputData);
        logger.info(`InsertMany output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`InsertMany error: ${error.stack}`);
    }


    try {
        // NODE UPDATEONE
        let inputData = {
            filter: { name: "Insert Many 01" },
            update: { gender: "Poly" },
            collection: "test"
        };
        let output = await require('./node.updateOne')(connectorData, inputData);
        logger.info(`UpdateOne output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`UpdateOne error: ${error.stack}`);
    }

    try {
        // NODE UPDATEMANY
        let inputData = {
            filter: { name: "Insert Many 01" },
            update: { gender: "Updated" },
            collection: "test"
        };
        let output = await require('./node.updateMany')(connectorData, inputData);
        logger.info(`UpdateMany output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`UpdateMany error: ${error.stack}`);
    }

    try {
        // NODE DELETEMANY
        let inputData = {
            filter: { name: "Insert Many 01" },
            project: {},
            sort: {},
            offset: 0,
            collection: "test"
        };
        let output = await require('./node.deleteMany')(connectorData, inputData);
        logger.info(`DeleteMany output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`DeleteMany error: ${error.stack}`);
    }

    try {
        // NODE DELETEONE
        let inputData = {
            filter: { gender: "Male" },
            project: {},
            sort: {},
            offset: 0,
            collection: "test"
        };
        let output = await require('./node.deleteOne')(connectorData, inputData);
        logger.info(`DeleteOne output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`DeleteOne error: ${error.stack}`);
    }

    try {
        // NODE COUNT
        let inputData = {
            filter: { gender: "Male" },
            project: {},
            sort: {},
            offset: 0,
            collection: "test"
        };
        let output = await require('./node.count')(connectorData, inputData);
        logger.info(`Count output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`Count error: ${error.stack}`);
    }

    try {
        // NODE AGGREGATE
        let inputData = {
            pipeline: [
                { $group: { _id: "$gender", count: { $sum: 1 } } }
            ],
            collection: "test"
        };
        let output = await require('./node.aggregate')(connectorData, inputData);
        logger.info(`Aggregate output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`Aggregate error: ${error.stack}`);
    }

    try {
        // NODE FIND
        let inputData = {
            filter: { name: "Insert Many 01" },
            collection: "test"
        };
        let output = await require('./node.find')(connectorData, inputData);
        logger.info(`Find output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`Find error: ${error.stack}`);
    }

    try {
        // NODE FINDONE
        let inputData = {
            filter: { name: "Insert Many 03" },
            collection: "test"
        };
        let output = await require('./node.findOne')(connectorData, inputData);
        logger.info(`FindOne output : ${JSON.stringify(output)}`);
    } catch (error) {
        logger.error(`FindOne error: ${error.stack}`);
    }

})().catch(error => {
    logger.error(`Unhandled error: ${error.stack}`);
});
