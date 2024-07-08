import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';
let client;
let collection;
let deletedCollection;
let isConnected = false;

// Connect to db after server starts
async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db('mydb');
    collection = database.collection('practice');
    deletedCollection = database.collection('deleted_documents');
    isConnected = true;
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    isConnected = false;
  }
}

async function updateDocument(id, update) {
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update },
      { upsert: true }
    );
    const updatedDocument = await collection.findOne({ _id: new ObjectId(id) });
    return updatedDocument;
  } catch (err) {
    console.error('Update document failed', err);
    throw err;
  }
}

async function getInsertedDocument() {
  try {
    const document = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    return document[0];
  } catch (err) {
    console.error('Get most recently inserted document failed', err);
    throw err;
  }
}

async function deleteDocument(id) {
  try {
    const document = await collection.findOne({ _id: new ObjectId(id) });
    if (document) {
      await deletedCollection.insertOne(document);
      await collection.deleteOne({ _id: new ObjectId(id) });
    }
    return document;
  } catch (err) {
    console.error('Delete document failed', err);
    throw err;
  }
}

async function getDeletedDocument() {
  try {
    const document = await deletedCollection.find().sort({ _id: -1 }).limit(1).toArray();
    return document[0];
  } catch (err) {
    console.error('Get most recently deleted document failed', err);
    throw err;
  }
}

app.use(express.json());

app.put('/put/:id', async (req, res) => {
  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const id = req.params.id;
    const update = req.body;
    const result = await updateDocument(id, update);
    res.json(result);
  } catch (err) {
    console.error('PUT /put/:id error:', err);
    res.status(500).send('Error updating document');
  }
});

app.get('/inserted', async (req, res) => {
  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const document = await getInsertedDocument();
    res.json(document);
  } catch (err) {
    console.error('GET /inserted error:', err);
    res.status(500).send('Error retrieving document');
  }
});

app.delete('/delete/:id', async (req, res) => {
  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const id = req.params.id;
    const deletedDocument = await deleteDocument(id);
    if (deletedDocument) {
      res.json(deletedDocument);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('DELETE /delete/:id error:', err);
    res.status(500).send('Error deleting document');
  }
});

app.get('/deleted', async (req, res) => {
  if (!isConnected) {
    return res.status(500).send('Error, cannot connect to MongoDB');
  }

  try {
    const document = await getDeletedDocument();
    res.json(document);
  } catch (err) {
    console.error('GET /deleted error:', err);
    res.status(500).send('Error retrieving deleted document');
  }
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
