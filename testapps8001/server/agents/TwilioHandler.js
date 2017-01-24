/*
 * This files requires the Twilio module and create a REST client for Twilio message service.
 * */

"use strict";
<!--$$Twilio_TwilioHandler_require_path$$-->
<!--$$Twilio_TwilioHandler_appdir$$-->
var config = require('../config/node_starter_kit_config');
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv('VCAP_SERVICES');

/**
 * Parse twilio serivce credentials from VCAP service
 */
var twilioCredentails = appEnv.getServiceCreds(config.twilio_service_name);

var twilioClient = require('twilio')(twilioCredentails.accountSID, twilioCredentails.authToken);

/**
 *  //Send SMS text message
 * @param {req} request from server which contains to, from and body
 * @param {res} response instance to send the response
 */
function sendMessage(req,res){

    twilioClient.sendMessage({

        to:req.body.toNumber,  // A phone number for which message needs to send
        from: req.body.fromNumber,  // A number you bought from Twilio and can use for outbound communication
        body: req.body.msg

    }, function(err, responseData) {

        if (!err) {

            return res.status(200).json({
                status: "Success",
                data: responseData
            });
        }
        else{
            return res.status(500).json({
                status: "Error",
                data: err
            });
        }
    });
}

exports.sendMessage = sendMessage;