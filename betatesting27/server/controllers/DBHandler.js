/*
 * This files creates DB Connection and perform all the DB Crud Operations.
 * */

/*jshint strict: false */

var config = require('../vcap_parser/environment_parser');

//Create DB Connection
var nano = require('nano')(config.getEnv().url);
var toDo;

/**
 * Create new todo table
 * @param {callBack} call-back function will be called after table is created.
 * */
function initDataBase(callBack) {

    nano.db.create('todo', function() {

        toDo = nano.use('todo');
        callBack(null);

    });

}

/**
 * Save a record
 * @param document - The document object which contains the data to be saved
 * @param callBack - The call-back function to catch the response or error
 * The data which has to be inserted or updated is passed to the function in the document object
 */
function save(document,callBack){
    //insert or update the data into database
    toDo.insert(document, callBack);
}

/**
 * Retrieve all records
 * @param callBack - The call-back function to catch the response or error
 * All the records present in the database is returned.
 */
function findAll(callBack) {
    // use include_docs & revs_info to get all values of the records from the database
    toDo.list({'include_docs':true, 'revs_info': true}, callBack);
}


/**
 * Find a record
 * @param id - The default id value created by couchdb which is the primary key for any object
 * @param callBack - The call-back function to catch the response or error
 * The data is retrieved from the database with the unique id as input.
 */
function findById(id,callBack)
{
    //find the existing record from the database, with the id value
    toDo.get(id, callBack);
}


/**
 * Delete a record
 * @param callBack - The call-back function to catch the response or error
 * The object retrieved from the database is deleted.
 */
function remove(id,revID,callBack) {
    toDo.destroy(id, revID, callBack);
}



exports.initDataBase = initDataBase;
exports.save = save;
exports.findAll = findAll;
exports.findById = findById;
exports.remove = remove;
