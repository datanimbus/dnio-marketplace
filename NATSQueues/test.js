const express = require('express');
const { natsConnector } = require('./connector');
const { publishMessage } = require('./node.publisher');
const { subscribeMessage } = require('./node.subscriber');
const log4js = require('log4js');

// Configure log4js
log4js.configure({
    appenders: { console: { type: 'console' }, file: { type: 'file', filename: 'nats-application.log' } },
    categories: { default: { appenders: ['console', 'file'], level: 'trace' } }
});

const logger = log4js.getLogger();

const app = express();
const port = 3000;

app.use(express.json());

const connectionString = process.env.NATS_URL || 'nats://localhost:4222';

let nc;

const initializeNats = async () => {
    try {
        nc = await natsConnector(connectionString);
    } catch (error) {
        console.error(`Failed to initialize NATS Client: ${error.message}`);
        process.exit(1);
    }
};

initializeNats();

// Endpoint to publish message
app.post('/publish', async (req, res) => {
    const { subject, message } = req.body;

    try {
        await publishMessage(nc, subject, message);
        res.status(200).send('Message published successfully');
    } catch (error) {
        res.status(500).send(`Error publishing message: ${error.message}`);
    }
});

// Endpoint to subscribe to a subject with a queue group
app.post('/subscribe', async (req, res) => {
    const { subject, queueGroup, subscriberId } = req.body;

    try {
        await subscribeMessage(nc, subject, queueGroup, subscriberId);
        res.status(200).send(`Subscriber ${subscriberId} subscribed to subject in queue group successfully`);
    } catch (error) {
        res.status(500).send(`Error subscribing to subject: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
