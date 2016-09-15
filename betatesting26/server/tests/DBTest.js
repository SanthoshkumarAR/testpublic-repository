/*global describe */
/*global beforeEach*/
/*global it */

/*
 This file contains the test cases in order to test the working of CRUD operations in To do database
 */

'use strict';


// Module dependencies.

var config = require("../vcap_parser/environment_parser");
var nano = require("nano")('http://localhost:5984');

nano.db.create('todo', function() {
    });
var toDoConection = nano.use('todo');

var expect = require('expect.js');


/**
 * Globals
 */

var todo;

var todoID, todoRevID;

/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    describe('todo:', function () {

        describe('Method Insert', function () {

            it('should be able to save without problems', function (done) {

                todo = { task_name: 'ToDo number one'};
                toDoConection.insert(todo, function(err, body, header) {
                    expect(err).to.be(null);
                    expect(body.ok).to.equal(true);
                    todoID = body.id;
                    todoRevID = body.rev;
                    done();
                });
            });

        });
        describe('Method Get All', function () {

            it('should be able to retrieve all ToDos without any problem', function (done) {
                return toDoConection.list({include_docs:true, revs_info: true}, function (err, data) {
                    expect(err).to.be(null);
                    expect(data.rows.length).to.be.above(0);
                    done();
                });

            });

        });
        describe('Method Update', function () {

            it('should be able to update without problems', function (done) {

                todo = { task_name: 'ToDo number one', "_rev": todoRevID, "_id": todoID};

                toDoConection.insert(todo, function(err, body, header) {
                    expect(err).to.be(null);
                    expect(body.ok).to.equal(true);
                    todoID = body.id;
                    todoRevID = body.rev;
                    done();
                });

            });

        });
        describe('Method Delete', function () {

            it('should be able to delete without problems', function (done) {

                toDoConection.destroy(todoID, todoRevID, function(err, data) {
                    expect(err).to.be(null);
                    expect(data.ok).to.equal(true);
                    done();
                });

            });

        });

    });
});
