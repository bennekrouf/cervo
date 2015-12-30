#!/usr/bin/env node --use_strict
(() => {

  "use strict";

  let express     = require('express'),
  bodyParser      = require('body-parser'),
  morgan          = require('morgan'),
  mongoose        = require('mongoose');

  let loadPublic = require('./api/public');
  const loadSecured = require('./api/secured');
  // let Model = require('./model');
  // Cervo.prototype.model = Model;

  module.exports = function Cervo(settings) {
    if(!settings){
      console.log("Cervo created with default settings.");
      settings = {};
    }
    settings.port = settings.port || process.env.PORT || 8080;

    // Server Configuration
    let app = express();
    app.use(bodyParser.urlencoded({
    	extended: false
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    loadPublic(app, settings);
    loadSecured(app, settings);

    this.settings = settings;
    this.app = app;

    this.run = () => {
      let promise = new Promise((resolve, reject) => {

        // DB Connection
        if(settings.mongo) {
          mongoose.createConnection(settings.mongo);
          app.set('SECRET_VAR', settings.secret || "secret");
        }

        app.listen(settings.port, function(){
          console.log(`Server started at ${settings.port}.`);
        });
      });
      return promise;
    };

    this.stop = () => {
      console.log(`Server stopped at ${settings.port}.`);
    };

  };

})();
