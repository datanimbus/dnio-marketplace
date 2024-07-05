const { getLogger } = require('log4js');

let logger = getLogger(`[SFTP]`);
logger.level = "TRACE"
global.logger = logger;

(async () => {
	let connectorData = {
		user: 'sftpUser',
		host: 'localhost',
		password: 'sftp@123',
		port: 22,
	};

	connectorData = await require('./connector')(connectorData);

	// TEST LIST FILES
	let inputData = {
		path: '/sftp/upload'
	};
	const listFilesResults = await require('./node.listFiles')(connectorData, inputData);
	logger.info(`List Files result : ${JSON.stringify(listFilesResults)}`);

	// TEST GET FILE
	inputData = {
		filePath: '/sftp/upload/test.txt',
	};
	const getFileResults = await require('./node.getFile')(connectorData, inputData);
	logger.info(`Get File result : ${JSON.stringify(getFileResults)}`);

	// TEST PUT FILE
	inputData = {
		localFile: '../input.txt',
		remoteFile: '/sftp/upload/test.txt',
	};
	const putFileResults = await require('./node.putFile')(connectorData, inputData);
	logger.info(`Put File result : ${JSON.stringify(putFileResults)}`);

	// TEST RENAME FILE
	inputData = {
		sourceFilePath: '/sftp/upload/test.txt',
		targetFilePath: '/sftp/upload/test_renamed.txt',
	};
	const renameFileResults = await require('./node.renameFile')(connectorData, inputData);
	logger.info(`Rename File result : ${JSON.stringify(renameFileResults)}`);

	// TEST DELETE FILE
	inputData = {
		filePath: '/sftp/upload/test.txt'
	};
	const deleteFileResults = await require('./node.deleteFile')(connectorData, inputData);
	logger.info(`Delete File result : ${JSON.stringify(deleteFileResults)}`);

})()