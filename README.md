# dnio-marketplace

- [dnio-marketplace](#dnio-marketplace)
- [Connectors and node](#connectors-and-node)
- [How to contribute](#how-to-contribute)
	- [Folder structure](#folder-structure)
	- [metadata.json](#metadatajson)
	- [connector.json](#connectorjson)
	- [node.xxxx.json](#nodexxxxjson)
	- [Writing connectors and nodes](#writing-connectors-and-nodes)
		- [connector.js](#connectorjs)
		- [node.xxx.js](#nodexxxjs)


# Connectors and node

```
Legend
✅ - Completed and ready to use.
🔶 - Internal review in-progress. Not ready to use.
🔴 - Incomplete.
⏺️ - Not applicale
```

| Type | Name | Connector | Nodes | Link |
|--|--|--|--|--|
| DB | MongoDB | ✅ | 🔶 | [link](./MongoDB/README.md) | 
| DB | MySQL | ✅ | ✅ | [link](./MySQL/README.md) | 
| DB | PostgreSQL | 🔶 | 🔶 | [link](./PostgreSQL/README.md) | 
| DB | MSSQL | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| DB | DocumentDB | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| DB | CosmosDB | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| DB | OracleDB | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| DB | Redis | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| Queues | Apache Kafka | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| Queues | Active MQ | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| Queues | NATS | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| File | SFTP | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| File | MongoDB GridFS | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| File | Amazon S3 | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| File | Azure Blob Storage | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| File | Google Cloud Storage | 🔴 | 🔴 | [link](./mongodb/README.md) | 
| HTTP | HTTP | ⏺️ | 🔴 | [link](./mongodb/README.md) | 

# How to contribute

## Folder structure
* Each folder indicates a connector and a set of nodes that can be added to the marketplace.
* Under each folder the following files are expected.
  * README.md - Used to describe what the contents of the folder are for.
  * metadata.json - Information on where to find the connector and node information. [File structure explained below](#metadatajson).
  * test.js - Test file that can test the contents of the file.
  * connector.js - Optional. If a connector is required then this is where it should be implemented. [Link](#connectorjs).
  * connector.json - Describes the connector. [File structure explained below](#connectorjson).
  * node.xxxx.js - The implementation for a node. [Link](#nodexxxjs).
  * node.xxxx.json - Describes the node. [File structure explained below](#nodexxxxjson).

## metadata.json

This file must have the following structure, 

```json
{
	"connector": "// connector json file. This is connector.json file where moe information regarding the connector can be found,"
	"nodes": [
		"// List of node json files"
	]
}
```

e.g.

```json
{
	"connector": "connector.json",
	"nodes": [
		"node.findOne.json",
		"node.insertMany.json",
		"node.insertOne.json"
	]
}
```

## connector.json

File structure, 

```json
{
	"name": "//Name of the connector as it should appear on marketplace,"
	"fileName": "connector.js",
	"fields": [
		"// fields are the input data for connector. This explains the each input field and their type."
		"// Use the marketplace UI to define this and copy the values here."
	]
}
```

Please check [this file](./MongoDB/connector.json) for reference.

## node.xxxx.json

Similar to [connector.json](#connectorjson). But requires 3 schemas attributes - `inputSchema`, `outputSchema`, `errorSchema`.

> `errorSchema` is fixed. You dont have to change it.

Please check [this file](./MongoDB/node.insertMany.json) for reference


## Writing connectors and nodes

Both connector and node must export one function only and it must have the following format.

### connector.js

```js
module.exports = async (connectorData) => {};
```

### node.xxx.js

If a node needs connector data then this is the format
```js
module.exports = async (connectorData, inputData) => {};
```

If no connector information is neded, like an HTTP node, then it can take this format.
```js
module.exports = async (inputData) => {};
```