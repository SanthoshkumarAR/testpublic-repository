"use strict";

/**
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {};
    returnObject.url = 'http://username:password@localhost:5984';
    return returnObject;

};

