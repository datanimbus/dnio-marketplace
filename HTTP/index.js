async function makeRequest(inputData, connectorData) {
  const { default: got } = await import('got');

  const gotConfig = {
      method: inputData.method,
      url: `${connectorData.protocol}://${connectorData.host}:${connectorData.port}${inputData.path}`,
      searchParams: inputData.query,
      headers: inputData.headers,
      timeout: inputData.timeout || 60000,
      responseType: 'buffer',
      throwHttpErrors: inputData.throwErrorOn4xx,
  };

  if (inputData.data) {
      gotConfig.body = Buffer.from(inputData.data);
  }

  console.info(`Making HTTP [${gotConfig.method}] Request at [${gotConfig.url}]`);
  console.trace(JSON.stringify(gotConfig));

  try {
      const response = await got(gotConfig);
      return response.body;
  } catch (error) {
      if (error.response) {
          return error.response.body;
      }
      throw error;
  }
}

module.exports = makeRequest;
