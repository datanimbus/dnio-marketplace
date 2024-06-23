const { MongoClient } = require('mongodb');
const _ = require('lodash');

let connector_data = {
    connection_string: "mongodb://localhost:27017/",
    database: "mydb"
};

let input_data = {
    filter: {},
    project: {},
    sort: {},
    limit: 0,
    offset: 0,
    collection: "practice"
};

const record = {
    "user_id": "109376-0378",
    "first_name": "Brad",
    "last_name": "Lukemia",
    "email": "lbrade@asdasd.Com",
    "gender": "Male",
    "birthdate": "7/27/2002",
    "address": "1122 E Apache Blvd",
    "city": "Chicago",
    "country": "USA",
    "phone_number": "373-832-6392"
};

// Function to connect to MongoDB
async function connect() {
    const client = await MongoClient.connect(connector_data.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = client.db(connector_data.database);
    return { client, db };
}

// Function to find documents in MongoDB
async function find(db, input_data) {
    const cursor = db.collection(input_data.collection).find(input_data.filter);
    if (!_.isEmpty(input_data.project)) {
        cursor.project(input_data.project);
    }
    if (!_.isEmpty(input_data.sort)) {
        cursor.sort(input_data.sort);
    }
    if (input_data.offset) {
        cursor.skip(input_data.offset);
    }
    if (input_data.limit) {
        cursor.limit(input_data.limit);
    }
    const result = await cursor.toArray();
    return { data: result };
}

// Function to find one document in MongoDB
async function findOne(db, input_data) {
    const cursor = db.collection(input_data.collection).find(input_data.filter);
    if (!_.isEmpty(input_data.project)) {
        cursor.project(input_data.project);
    }
    if (!_.isEmpty(input_data.sort)) {
        cursor.sort(input_data.sort);
    }
    if (input_data.offset) {
        cursor.skip(input_data.offset);
    }
    const result = await cursor.limit(1).toArray();
    return { data: result[0] };
}

// Function to count documents in MongoDB
async function count(db, input_data) {
    const count = await db.collection(input_data.collection).countDocuments(input_data.filter);
    return { count };
}

// Function to insert a document into MongoDB
async function insert(db, collection, document) {
    const result = await db.collection(collection).insertOne(document);
    return { inserted_id: result.insertedId };
}

// Function to update a single document in MongoDB
async function updateOne(db, input_data, update) {
    const result = await db.collection(input_data.collection).updateOne(input_data.filter, { $set: update });
    return { modified_count: result.modifiedCount };
}

// Function to update multiple documents in MongoDB
async function updateMany(db, input_data, update) {
    if (_.isEmpty(input_data.filter)) {
        throw new Error('Invalid');
    }
    const result = await db.collection(input_data.collection).updateMany(input_data.filter, { $set: update });
    return { modified_count: result.modifiedCount };
}

// Function to delete a single document in MongoDB
async function deleteOne(db, input_data) {
    if (_.isEmpty(input_data.filter)) {
        throw new Error('Invalid');
    }
    const result = await db.collection(input_data.collection).deleteOne(input_data.filter);
    return { deleted_count: result.deletedCount };
}

// Function to delete multiple documents in MongoDB
async function deleteMany(db, input_data) {
    if (_.isEmpty(input_data.filter)) {
        throw new Error('Invalid');
    }
    const result = await db.collection(input_data.collection).deleteMany(input_data.filter);
    return { deleted_count: result.deletedCount };
}

// Function to aggregate documents in MongoDB
async function aggregate(db, input_data, pipeline) {
    const result = await db.collection(input_data.collection).aggregate(pipeline).toArray();
    return { data: result };
}

//TESTS
(async () => {
    let client;
    try {
        const connection = await connect();
        client = connection.client;
        const db = connection.db;

        // Insert a document
        const insert_result = await insert(db, "practice", record);
        console.log('Insert Result:', insert_result);

        // Test find function with different input_data
        input_data = {
            filter: { gender: "Female" },
            project: {},
            sort: {},
            limit: 10,
            offset: 0,
            collection: "practice"
        };
        const find_result = await find(db, input_data);
        console.log('Find Result:', find_result);

        // Test findOne function
        input_data = {
            filter: { gender: "Male" },
            project: {},
            sort: {},
            limit: 1,
            offset: 0,
            collection: "practice"
        };
        const find_one_result = await findOne(db, input_data);
        console.log('FindOne Result:', find_one_result);

        // Test count function
        input_data = {
            filter: { gender: "Female" },
            collection: "practice"
        };
        const count_result = await count(db, input_data);
        console.log('Count Result:', count_result);

        // Test updateOne function
        input_data = {
            filter: { gender: "Male" },
            collection: "practice"
        };
        const update_one_fields = { country: "USA" };
        const update_one_result = await updateOne(db, input_data, update_one_fields);
        console.log('UpdateOne Result:', update_one_result);

        // Test updateMany function
        input_data = {
            filter: { gender: "Male" },
            collection: "practice"
        };
        const update_many_fields = { city: "New York" };
        const update_many_result = await updateMany(db, input_data, update_many_fields);
        console.log('UpdateMany Result:', update_many_result);

        // Test deleteOne function
        input_data = {
            filter: { user_id: "10096-0303" },
            collection: "practice"
        };
        const delete_one_result = await deleteOne(db, input_data);
        console.log('DeleteOne Result:', delete_one_result);

        // Test deleteMnay function
        input_data = {
            filter: { gender: "Male" },
            collection: "practice"
        };
        const delete_many_result = await deleteMany(db, input_data);
        console.log('DeleteMany Result:', delete_many_result);

        // Test aggregate function
        input_data = {
            collection: "practice"
        };
        const pipeline = [
            { $match: { gender: "Female" } },
            { $group: { _id: "$city", total: { $sum: 1 } } }
        ];
        const aggregate_result = await aggregate(db, input_data, pipeline);
        console.log('Aggregate Result:', aggregate_result);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (client) {
            await client.close();
        }
    }
})();
