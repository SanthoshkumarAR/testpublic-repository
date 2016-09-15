/*
 * This files Handles all the business logic for toDO app.
 * */


/*global logger */
/*jshint strict: false */
/*jshint camelcase: false */

var ToDoDbHandler = require('./DBHandler');

// Constants Messages
var TASK_MESSAGE = 'Task name must not be empty';
var DELETE_MESSAGE = 'Deleted Successfully';

/**
 * Create DB Connection
 * @param {cb} callback function contains err if connection failed.
 * */
ToDoDbHandler.initDataBase(function (err) {
    if (!err) {
        logger.log('info', 'Connected to DB ...');

    }
});

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
        logger.log("info","Response ", +data);
        return response.status(200).json({
            status: "Success",
            data: data
        });

    }
    else
    {
        logger.log("info","Error :"+data);
        return response.status(500).json({
            status: "Error",
            data: data
        });
    }
}

/**
 *  GET last inserted or updated row
 * @param {insertedID} last inserted id
 * @param {res} response instance to send the response
 */
function getDocument (insertedID, res) {

    ToDoDbHandler.findById(insertedID, function(err, data) {

        if(!err) {
            responseHandler(res, true, data);
        }
        else {
            responseHandler(res, false, data);
        }

    });

}

/**
 *  Create a ToDo task
 * @param {req} request from server which contains task_name
 * @param {res} response instance to send the response
 */
function create (req, res) {
    logger.log('info','POST request received Body:'+JSON.stringify(req.body));
    if(req.body.task_name) {

        var document = { 'task_name': req.body.task_name};
        ToDoDbHandler.save(document, function(err, body, header){

            if(!err)
            {
                getDocument(body.id, res);

            }
            else
            {
                responseHandler(res, false, err);
            }

        });
    }
    else {

        responseHandler(res, false, TASK_MESSAGE);
    }
}

/**
 *  Update ToDo task
 * @param {req} request from server which contains task_name and revID
 * @param {res} response instance to send the response
 */
function update (req, res) {
    logger.log('info','PUT request received Parameters:'+JSON.stringify(req.params)+'\nBody :'+JSON.stringify(req.body));
    if(req.body.task_name && req.body.revID) {

        var updateDoc = {
            '_id': req.params._id,
            '_rev': req.body.revID,
            'task_name': req.body.task_name
        };

        ToDoDbHandler.save(updateDoc, function(err, body, header){
            if(!err)
            {
                getDocument(body.id, res);
            }
            else
            {
                responseHandler(res, false, err);
            }

        });
    }
    else {
        responseHandler(res, false, TASK_MESSAGE);
    }
}

/**
 *  List of ToDo's
 * @param {req} request from server
 * @param {res} response instance to send the response
 */
function all (req, res) {
    logger.log('info','GET request received ');

    ToDoDbHandler.findAll(function(err, data){
        if(!err)
        {
            var documentArr = [];
            if(Array.isArray(data.rows))
            {
                data.rows.filter(function( document ) {
                    documentArr.push(document.doc);
                });
            }
            responseHandler(res, true, documentArr);
        }
        else
        {
            responseHandler(res, false, err);
        }

    });
}

/**
 *  Delete a ToDo
 * @param {req} request from server
 * @param {res} response instance to send the response
 */
function remove (req, res) {
    logger.log('info', 'DELETE request received Parameters:' + JSON.stringify(req.params));



    ToDoDbHandler.remove(req.params._id, req.params._rev, function(err, data){
        if(!err)
        {
            responseHandler(res, true, DELETE_MESSAGE);
        }
        else
        {
            responseHandler(res, false, err);
        }

    });

}

exports.create = create;
exports.update = update;
exports.all = all;
exports.remove = remove;