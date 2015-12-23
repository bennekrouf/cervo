#!/usr/bin/env node --use_strict
"use strict";

let Bot = function (settings) {
  this.settings = settings;
  this.settings.port = this.settings.port || process.env.PORT || 8080;
};

module.exports = Bot;

const express   = require('express'),
bodyParser    = require('body-parser'),
morgan        = require('morgan'),
mongoose      = require('mongoose'),
User          = require('./app/models/user');

const loadSecured = require('./app/secured'),
loadNonsecured = require('./app/nonsecured');

Bot.prototype.run = function() {

    let port = this.settings.port;
    let app = express();
    mongoose.connect(config.database);
    app.set('SECRET_VAR', this.settings.secret || config.secret || "secret");
    app.use(bodyParser.urlencoded({
    	extended: false
    }));

    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.listen(port);

    loadSecured(app, this.settings);
    loadNonsecured(app, this.settings);

    console.log('Magic at http://localhost:'+port);
};
