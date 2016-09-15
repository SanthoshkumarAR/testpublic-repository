/*
 * This files Handles all the business logic
 * */

var DBHandler = require('./DBHandler');



/**
 * Create DB Connection
 * @param {cb} callback function contains err if connection failed.
 * */
DBHandler.initDataBase(function (err) {
    if (!err) {
        logger.log('info', 'Connected to DB ...');
        /*The following is the query which denotes the schema of the tabke to be created. It is a good practise to create
         a primary key for for searches and indexing.*/
        var createTableQuery = 'CREATE TABLE IF NOT EXISTS  TableName (_id MEDIUMINT NOT NULL AUTO_INCREMENT,columnName CHAR(30) NOT NULL,PRIMARY KEY (_id))';
        DBHandler.executeQuery(createTableQuery, null, function (error, data) {
            if (!error)
                logger.log('info', 'Table created');
        });

    }
});
/**
 *  Create a Object
 * @param {req} request from server which contains columnName
 * @param {res} response instance to send the response
 */
function create(req, res) {
    logger.log("info", "POST request received " + req.body);
    if (req.body.columnName) {

        var insertQuery = 'INSERT INTO TableName SET columnName = ?';

        DBHandler.executeQuery(insertQuery, req.body.columnName, function (err, data) {

            if (!err) {
                //Data succesfully inserted

            }
            else {
                //Handle error object
            }

        });
    }
    else {
        //Handle error object
    }
}


/**
 * Export all functions to be accessed in other files
 */
exports.create = create;
