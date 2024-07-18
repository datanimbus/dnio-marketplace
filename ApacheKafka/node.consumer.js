const kafka = require('kafka-node');

class Consumer {
    constructor(kafkaHost, topics, groupId) {
        const client = new kafka.KafkaClient({ kafkaHost });
        this.consumer = new kafka.ConsumerGroup({
            kafkaHost,
            groupId,
            fromOffset: 'latest'
        }, topics);
    }

    onMessage(callback) {
        this.consumer.on('message', (message) => {
            callback(message);
        });
    }
}

module.exports = Consumer;
