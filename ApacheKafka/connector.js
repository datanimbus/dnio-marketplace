const Producer = require('./producer/producer');
const Consumer = require('./consumer/consumer');
const Acknowledgment = require('./acknowledge');
const logger = global.logger || console; 

class KafkaConnector {
    constructor(kafkaHost, producerTopic, consumerTopic, groupId) {
        logger.trace("Kafka Connector: Invoked!");

        this.producer = new Producer(kafkaHost);
        this.consumer = new Consumer(kafkaHost, [consumerTopic], groupId);
        this.producerTopic = producerTopic;
        this.acknowledgment = new Acknowledgment();

        const connectorData = { kafkaHost, producerTopic, consumerTopic, groupId };
        logger.trace(`Kafka Connector: Connector Data: ${JSON.stringify(connectorData)}`);
    }

    async sendMessage(message) {
        try {
            logger.trace(`Kafka Connector: Sending message to topic ${this.producerTopic}`);
            const result = await this.producer.send(this.producerTopic, message);
            logger.info('Kafka Connector: Message sent:', result);
        } catch (error) {
            logger.error('Kafka Connector: Error sending message:', error);
        }
    }

    receiveMessage(callback) {
        logger.trace(`Kafka Connector: Setting up consumer for topic`);
        this.consumer.onMessage((message) => {
            logger.trace('Kafka Connector: Message received:', message);
            this.acknowledgment.addAck(message.offset, () => {
                logger.info('Kafka Connector: Message acknowledged:', message.offset);
                callback(message);
            });
        });
    }

    acknowledgeMessage(messageId) {
        logger.trace(`Kafka Connector: Acknowledging message with ID ${messageId}`);
        this.acknowledgment.acknowledge(messageId);
    }
}

module.exports = KafkaConnector;
