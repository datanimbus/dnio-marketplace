class Acknowledgment {
    constructor() {
        this.pendingAcks = new Map();
    }
  
    addAck(messageId, ackCallback) {
        this.pendingAcks.set(messageId, ackCallback);
    }
  
    acknowledge(messageId) {
        if (this.pendingAcks.has(messageId)) {
            const ackCallback = this.pendingAcks.get(messageId);
            ackCallback();
            this.pendingAcks.delete(messageId);
        }
    }
  }
  
  module.exports = Acknowledgment;
  