require('dotenv').config();
const KafkaConnector = require('./connector');

const kafkaHost = process.env.KAFKA_HOST;
const producerTopic = process.env.PRODUCER_TOPIC;
const consumerTopic = process.env.CONSUMER_TOPIC;
const groupId = process.env.GROUP_ID;

const kafkaConnector = new KafkaConnector(kafkaHost, producerTopic, consumerTopic, groupId);

// Sending a message
const testMessage = 'Hello, Kafka!';

kafkaConnector.sendMessage(testMessage)
    .then(() => {
        console.log('Message sent successfully');
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });

// Receiving and acknowledging messages
kafkaConnector.receiveMessage((message) => {
    console.log('Processing message:', message.value);
    setTimeout(() => {
        kafkaConnector.acknowledgeMessage(message.offset);
    }, 5000); // Acknowledge after 5 seconds
});
