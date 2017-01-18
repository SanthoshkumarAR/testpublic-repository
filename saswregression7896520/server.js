'use strict';

/**
 * Module dependencies.
 */
/*globals logger*/
var logModule = require("./modules/todo/server/controllers/LogHandler");
/*  Initialise Logging */
global.logger = logModule.initLogModule();
var app = require('./config/lib/app');
var server = app.start();

