"use strict";
//Require dependant files
var appDir = require('path').dirname(require.main.filename);
var serviceConfig = require(appDir + '/config/node_starter_kit_config');

//Require dependant modules
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv('VCAP_SERVICES');

var username;
var password;
//Constant string messages
const missingParameters="Some of the input parameters are missing";
const sendGridClientError="Error while initiating the SendGrid client";

/**
 * Parse VCAP services objects, based on service name
 */
var service_name = serviceConfig.sendgrid_service;
var credentials;
if (service_name) {
    credentials = appEnv.getServiceCreds(service_name);
}

if (credentials) {
    //Get the username and password from the environment variables
    username= credentials.username;
    password= credentials.password;
}
/*Override the username and password here, to check locally, without deploying in PAAS */
//username="****";
//password="****";

/**
 * Response Handler
 * @param response - Object through which response is sent
 * @param status - Boolean status of the process
 * @param data - contains the error or data information to be returned
 * The response handler will send the data in json format according to the status.
 */
function responseHandler(response, status, data)
{

    if(status){
        return response.status(200).json({
            status: "Success",
            data: data
        });
    }
    else
    {
        logger.log("error","Error : "+JSON.stringify(data));
        return response.status(500).json({
            status: "Error",
            data: data
        });
    }
}
/**
 * sendMail To send a mail through sendgrid
 * @param request The requets object containing all the information to be sent in mail
 * @param response The instance object to send the response
 */
function sendMail(request,response) {
    var toEmail = request.body.to_email;
    var fromEmail = request.body.from_email;
    var subject=request.body.subject;
    var text=request.body.text;
    if (!toEmail || !fromEmail || !subject || !text) {
        return responseHandler(response, false, missingParameters);
    }
    var sendgrid = require('sendgrid')(username, password);
    if (!sendgrid) {
        return responseHandler(response, false, sendGridClientError);
    }
    sendgrid.send(
        {
            to: toEmail,
            from: fromEmail,
            subject: subject,
            text: text
        },
        function (error) {
            if (!error) {
                //Send the success message as part of the response
                responseHandler(response, true, "Email sent successfully");
            }
            else {
                //Send the error as part of the response
                responseHandler(response, false, error);
            }
        });
}
exports.sendMail=sendMail;
