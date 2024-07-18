class Acknowledgment {
    constructor() {
        this.acks = new Map();
    }

    addAck(messageId, ackFunction) {
        this.acks.set(messageId, ackFunction);
    }

    acknowledge(messageId) {
        if (this.acks.has(messageId)) {
            this.acks.get(messageId)();
            this.acks.delete(messageId);
        } else {
            console.error(`No acknowledgment found for message ID ${messageId}`);
        }
    }
}

module.exports = Acknowledgment;
