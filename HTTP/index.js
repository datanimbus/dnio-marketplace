import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

// Dummy data
let data = [{ id: 1, name: 'John Doe' }];

// GET method
app.get('/find', (req, res) => {
  res.json(data);
});

// POST method
app.post('/add', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT method
app.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  data = data.map(item => (item.id === id ? updatedItem : item));
  res.json(updatedItem);
});

// DELETE method
app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter(item => item.id !== id);
  res.status(204).send("Successfully deleted item!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
