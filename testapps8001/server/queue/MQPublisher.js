"use strict";
// Access the callback-based API
var amqp = require('amqplib/callback_api');
var mqConfig = require('../config/mqconfig');
//Require the files to get the environment details
<!--$$RabbitMQ_MQPublisher_require_path$$-->
<!--$$RabbitMQ_MQPublisher_appdir$$-->
var config = require('../config/node_starter_kit_config');
/**
 * Parse VCAP services objects, based on service type
 * @return RabbitMQ uri as returnObject
 */
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var rabbitMQ_uri = (function () {
    if (appEnv.getService(config.service_name)) {
        return appEnv.getService(config.rabbitmq_service_name).credentials.uri;
    } else {
        logger.log('error', 'No service name ' + config.rabbitmq_service_name + ' bound to the application. Connecting locally');
        return 'amqp://localhost';
    }
}());
// Variables that will be used within all functions
var amqpConnect = null;
var publisherChannel = null;
// Queue name
var queue = 'todo';
/**
 * Set up a connection
 * create mq connection and channel to send messages. This will be done only once
 * @param callBack
 */
function initConnection(callBack) {
    //establish a connection to RabbitMQ
    amqp.connect(rabbitMQ_uri + "?heartbeat=" + mqConfig.heartbeat, function (err, mqConnection) {
        if (err) {
            logger.log("error", "[AMQP]" + err.message);
            // if the connection is closed or fails to be established at all, it will reconnect
            return setTimeout(initConnection(callBack), mqConfig.reconnectTime);
        }
        mqConnection.on("error", function (err) {
            if (err.message !== "Connection closing") {
                logger.log("error", "[AMQP] mqConnection error" + err.message);
                throw err;
            }
        });
        mqConnection.on("close", function () {
            logger.log("error", "[AMQP] reconnecting");
            // if the connection is closed or fails to be established at all, it will reconnect
            return setTimeout(initConnection(callBack), mqConfig.reconnectTime);
        });

        logger.log("info", "[AMQP] connected");
        // amqpConnect will hold the connection and channels will be set up in the connection
		exports.mqConnectionSuccess = mqConnection;
        amqpConnect = mqConnection;
        // creates a channel on the connection
        amqpConnect.createChannel(function (err, channel) {
            // `err` will contain the error object, if any errors occurred
            // `channel` will contain the channel object
            // calls `closeOnErr` function if an error occurred when creating the channel
            if (closeOnErr(err)) throw err;
            channel.on("error", function (err) {
                logger.log("error", "[AMQP] channel error" + err.message);
                throw err;
            });
            channel.on("close", function () {
                logger.log("info", "[AMQP] channel closed");
            });
            publisherChannel = channel;
            callBack();
        });
    });
}
/**
 * Publisher
 * This function will be called when the channel is created
 * Publish the message to queue
 * @param todoMessage
 */
function startPublisher(todoMessage) {
    var message = todoMessage;
    // asserts the queue exists
    publisherChannel.assertQueue(queue, {durable: true}, function (err, _ok) {
        if (err) {
            logger.log("error", "[AMQP] publisher error" + err);
            throw (err);
        }
        // sends a message to the queue
        publisherChannel.sendToQueue(queue, new Buffer(message));
        logger.log("info", " [x] Sent " + message);
    });
}
/**
 * Close the connection on error
 * @param err
 * @returns {boolean}
 */
function closeOnErr(err) {
    if (!err) return false;
    logger.log("error", "[AMQP] error: " + err);
    amqpConnect.close();
    return true;
}

// Global functions
exports.initConnection = initConnection;
exports.startPublisher = startPublisher;
