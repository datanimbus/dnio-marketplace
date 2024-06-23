const { getLogger } = require('log4js');

let logger = getLogger(`[MongoDB]`);
logger.level = "TRACE"
global.logger = logger;

logger.trace("Hello, World!");

(async () => {
	let connectorData = {
		connectionString: "mongodb://localhost:27017",
		database: "mydb",
		// tls: true,
		// certName: "ca.pem",
		// cert: "cert"
	}

	require('./connector')(connectorData);
})()