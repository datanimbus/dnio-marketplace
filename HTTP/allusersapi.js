import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000; 
const uri = 'mongodb://localhost:30017';
let client;
let collection;
let isConnected = false;

// Connect to db after server starts
async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db('dnio-marketplace');
    collection = database.collection('test');
    isConnected = true;
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    isConnected = false;
  }
}

async function runAggregation(parameter) {
  try {
    // Aggregation Pipeline
    const pipeline = [
      {
        $group: {
          _id: `$${parameter}`,
          totalUsers: { $sum: 1 },          
        }
      }
    ];

    const cursor = collection.aggregate(pipeline);
    const groupedResults = await cursor.toArray();

    return groupedResults;
  } catch (err) {
    console.error('Aggregation failed', err);
    throw err;
  }
}

async function findAll() {
  try {
    const cursor = collection.find({});
    const allDocuments = await cursor.toArray();
    return allDocuments;
  } catch (err) {
    console.error('Find all documents failed', err);
    throw err;
  }
}

app.get('/aggregate', async (req, res) => {
  const parameter = req.query.param;

  if (!parameter) {
    return res.status(400).send('Query parameter "param" is required');
  }

  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const result = await runAggregation(parameter);
    res.json(result);
  } catch (err) {
    res.status(500).send('Error during aggregation');
  }
});

app.get('/find', async (req, res) => {
  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const result = await findAll();
    res.json(result);
  } catch (err) {
    res.status(500).send('Error retrieving documents');
  }
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
