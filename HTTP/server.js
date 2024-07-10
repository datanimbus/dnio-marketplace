const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
    if (req.url === '/get' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'GET request successful' }));
    } else if (req.url === '/update' && (req.method === 'PUT' || req.method === 'POST')) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(`${req.method} Received data:`, body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `${req.method} request successful`, data: body ? JSON.parse(body) : {} }));
        });
    } else if (req.url === '/delete' && req.method === 'DELETE') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(`${req.method} Received data:`, body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'DELETE request successful', data: body ? JSON.parse(body) : {} }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
