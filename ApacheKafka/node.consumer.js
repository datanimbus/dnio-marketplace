const kafka = require('kafka-node');
const logger = global.logger || console;

class Consumer {
    constructor(kafkaHost, topics, groupId) {
        logger.trace("Consumer: Initializing");
        const client = new kafka.KafkaClient({ kafkaHost });
        this.consumer = new kafka.ConsumerGroup({
            kafkaHost,
            groupId,
            protocol: ['roundrobin']
        }, topics);

        this.consumer.on('error', (err) => {
            logger.error('Consumer: Error in Kafka Consumer', err);
        });
    }

    onMessage(callback) {
        this.consumer.on('message', (message) => {
            logger.trace('Consumer: Message received:', message);
            callback({
                topic: message.topic,
                partition: message.partition, //based on partitioning requirements
                offset: message.offset,
                value: message.value,
                key: message.key
            });
        });
    }
}

module.exports = Consumer;
