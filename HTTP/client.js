import got from 'got';

const baseURL = 'http://localhost:3000';

// GET request
async function getData() {
  try {
    const response = await got(`${baseURL}/find`, { responseType: 'json' });
    console.log('GET Response:', response.body);
  } catch (error) {
    console.error('GET Error:', error.response.body);
  }
}

// POST request
async function postData() {
  try {
    const newItem = { id: 2, name: 'Jane Doe' };
    const response = await got.post(`${baseURL}/add`, {
      json: newItem,
      responseType: 'json'
    });
    console.log('POST Response:', response.body);
  } catch (error) {
    console.error('POST Error:', error.response.body);
  }
}

// PUT request
async function updateData() {
  try {
    const updatedItem = { id: 1, name: 'John Smith' };
    const response = await got.put(`${baseURL}/update/1`, {
      json: updatedItem,
      responseType: 'json'
    });
    console.log('PUT Response:', response.body);
  } catch (error) {
    console.error('PUT Error:', error.response.body);
  }
}

// DELETE request
async function deleteData() {
  try {
    await got.delete(`${baseURL}/delete/1`);
    console.log('DELETE Response: Item deleted');
  } catch (error) {
    console.error('DELETE Error:', error.response.body);
  }
}

// Test all methods
async function testAllMethods() {
  await getData();
  await postData();
  await getData();
  await updateData();
  await getData();
  await deleteData();
  await getData();
}

testAllMethods();
