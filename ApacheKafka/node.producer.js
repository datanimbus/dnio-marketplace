const kafka = require('kafka-node');
const logger = global.logger || console; 

class Producer {
    constructor(kafkaHost) {
        logger.trace("Producer: Initializing");
        const client = new kafka.KafkaClient({ kafkaHost });
        this.producer = new kafka.Producer(client);
        
        this.producer.on('ready', () => {
            logger.info('Producer: Kafka Producer is ready');
        });

        this.producer.on('error', (err) => {
            logger.error('Producer: Error in Kafka Producer', err);
        });
    }

    send(topic, messages) {
        logger.trace(`Producer: Sending messages to topic ${topic}`);
        return new Promise((resolve, reject) => {
            this.producer.send([{ topic, messages }], (err, data) => {
                if (err) {
                    logger.error('Producer: Error sending message', err);
                    reject(err);
                } else {
                    logger.info('Producer: Message sent successfully', data);
                    resolve(data);
                }
            });
        });
    }
}

module.exports = Producer;
