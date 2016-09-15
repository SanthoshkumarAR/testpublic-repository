"use strict";
/*globals logger*/
var postgresPromise = require("pg-promise")();
var nodeStarterConfig = require('../vcap_parser/environment_parser');
// Create a shared connection object to reuse the connection pool in the app.
var objDbConnection;
/**
 * connect to postgres db and pass database to the router via request
 */
function initDataBase(callBack) {
    var dbEnv = nodeStarterConfig.getEnv();
    var conString = dbEnv.url;
    // Connect to the database before starting the application server.
    var db = postgresPromise(conString);
    db.connect()
        .then(function (obj) {
            objDbConnection = obj; // save the connection object;
            callBack(null, true);
        }, function (reason) {
            // send the error in callBack
            callBack(reason, null);
        })
        .catch(function (err) {
            // send the error in callBack
            callBack(err, null);
        });
}
/**
 * Execute the query and return the data in callBack
 * @param {query} query string to execute DB.
 * @param {params} params Array contains attribute values.
 * @param {callBack} function contains err  and data.
 */
function executeQuery(query, data, callBack) {
    if (data) {
        objDbConnection.result(query, data)
            .then(function (result) {
                // Query execution result
                callBack(null, result);
            })
            .catch(function (error) {
                callBack(error, null); // print error;
            });
    }
    else {
        objDbConnection.result(query)
            .then(function (result) {
                // Query execution result
                callBack(null, result);
            })
            .catch(function (error) {
                callBack(error, null);// print error;
            });
    }
}
/**
 * Export all functions to be accessed in other files
 */
exports.initDataBase = initDataBase;
exports.executeQuery = executeQuery;

