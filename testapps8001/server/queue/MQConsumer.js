"use strict";
/**
 * Consumer
 * Set up a consumer with a callback to be invoked with each message
 */
function consumer() {
    // asserts the queue exists
    publisherChannel.assertQueue(queue, {durable: true});
    //consumes the queue
    publisherChannel.consume(queue, function (msg) {
        if (msg !== null) {
            // writes the received message to the console
            logger.log("info", " [x] Received " + msg.content.toString());
            // acknowledge that the message was received
            publisherChannel.ack(msg);
        }
    });
}
exports.consumer = consumer;
