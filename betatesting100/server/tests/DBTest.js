/*
 This file contains the test cases in order to test the working of CRUD operations in To do database
 */

// Module dependencies
"use strict";
// default promise library to handle the unexpected error
var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var postgresPromise = require('pg-promise')(options);
var should = require('chai').should();
/**
 * To get the DB details running in localhost or from vcap service
 */
var nodeStarterConfig = require('../vcap_parser/environment_parser');
var objDbConnection; // shared connection object;
var initialRecord = "task_new";
var recordId = "";
var updateRecord = "task_updated";
/**
 * ToDo test suite
 */
describe('Postgres-DB-Unit Test', function () {
    before(function (before_done) {
        var dbEnv = nodeStarterConfig.getEnv();
        /**
         * db to use one connection per test
         * recordId to get the newly inserted unique id
         * initialRecord is new record to be inserted
         * @type {string}
         */
        var db = postgresPromise(dbEnv.url);
        db.connect()
            .then(function (obj) {
                objDbConnection = obj; // save the connection object;
                var createTableQuery = "CREATE TABLE IF NOT EXISTS todo" +
                    "(" +
                    "task_name character varying(50)," +
                    "_id serial NOT NULL PRIMARY KEY" +
                    ")";
                objDbConnection.query(createTableQuery)
                    .then(function () {
                        // DB table created if it does not exist
                        before_done();
                    })
                    .catch(function (error) {
                        return promise.reject(error);// print error;
                    });
            }, function (reason) {
                return promise.reject(reason);//reason.error;
            })
            .catch(function (err) {
                return promise.reject(err);
            });
    });
    describe('CRUD operations', function () {
        /**
         * ToDo test cases
         */
        var result;
        it("should be able to Insert record", function (done) {
            /** One or more rows expected. */
            objDbConnection.one("INSERT INTO todo (task_name) VALUES ($1) RETURNING *", [initialRecord])
                .then(function (data) {
                    result = data;
                    should.not.equal(result, undefined);
                    // just a protocol check;
                    result.should.be.an('object');
                    // After insertion, checking the inserted data
                    result.should.have.property('task_name');
                    recordId = result._id;
                    done();
                }, function () {
                    // Clearing the result variable
                    result = null;
                })
                .catch(function (error) {
                    throw error; // print error;
                });
        });
        it('should be able to retrieve all records', function (done) {
            objDbConnection.query("SELECT * FROM todo")
                .then(function (result) {
                    // Db result will be array of records
                    result.should.be.instanceof(Array);
                    // After inserting one record, result length must be greater than 0
                    result.should.have.length.above(0);
                    // After updating, result will give the updated count
                    should.exist(result);
                    done();
                })
                .catch(function (error) {
                    throw error; // print error;
                });
        });
        it('should be able to Update record', function (done) {
            // Retrieve the data to insert from the POST body
            objDbConnection.result("UPDATE todo SET task_name=($1) WHERE _id=($2) RETURNING *", [updateRecord, recordId])
                .then(function (result) {
                    // Confirm that that result type is array of records
                    result.rows.should.be.instanceof(Array);
                    should.exist(result);
                    // Check rowcount which indicates one row has been updated
                    result.should.have.property('rowCount', 1);
                    // After updating, initial record will not match the updated record
                    should.not.equal(initialRecord, updateRecord);
                    done();
                })
                .catch(function (error) {
                    throw error; // print error;
                });
        });
        it('should be able to delete record', function (done) {
            // Retrieve the data to insert from the POST body
            objDbConnection.result("DELETE FROM todo WHERE _id=($1)", [recordId])
                .then(function (result) {
                    // Confirm that that an result exists
                    should.exist(result);
                    // Once deleted, the record count in resullt will be 0
                    should.not.equal(1, result.rows.length);
                    done();
                })
                .catch(function (error) {
                    throw error; // print error;
                });
        });
    });
    /**
     * Close DB connection after completion of CRUD suite
     */
    after(function (done) {
        //After all CRUD operations, close db connection
        objDbConnection.done(); // release connection;
        done();
    });
});
