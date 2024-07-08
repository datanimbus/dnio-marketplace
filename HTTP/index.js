import got from 'got';
import express from 'express';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const app = express();
const pipelineAsync = promisify(pipeline);

app.use(express.json()); 

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.get('/', async (req, res) => {
  try {
    await pipelineAsync(
      got.stream('https://www.google.com'),
      fs.createWriteStream('index.html')
    );
    res.send('File saved successfully!');
  } catch (error) {
    console.error('GET / error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/post', async (req, res) => {
  try {
    console.log('POST request body:', req.body);
    const response = await got.post('http://localhost:3000/insert', {
      json: req.body,
      responseType: 'json'
    });
    console.log('POST response:', response.body);
    res.json(response.body);
  } catch (error) {
    console.error('POST /post error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/put/:id', async (req, res) => {
  try {
    console.log('Received PUT request with body:', req.body);
    const response = await got.put(`http://localhost:3000/put/${req.params.id}`, {
      json: req.body,
      responseType: 'json'
    });
    console.log('PUT response:', response.body);
    res.json(response.body);
  } catch (error) {
    console.error('PUT /put/:id error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    console.log('Received DELETE request for ID:', req.params.id);
    const response = await got.delete(`http://localhost:3000/delete/${req.params.id}`);
    res.json(response.body);
  } catch (error) {
    console.error('DELETE /delete/:id error:', error);
    res.status(500).send('Internal Server Error');
  }
});
