#!/usr/bin/env node --use_strict
(() => {

  "use strict";

  var Cervo = function (settings) {
    this.settings = settings;
    this.settings.port = this.settings.port || process.env.PORT || 8080;
  };
  const express   = require('express'),
  bodyParser      = require('body-parser'),
  morgan          = require('morgan'),
  mongoose        = require('mongoose');

  const loadSecured = require('./api/secured');
  const loadNonsecured = require('./api/nonsecured');
  const Model = require('./model');

  Cervo.prototype.model = Model;
  Cervo.prototype.run = function() {

      let port = this.settings.port;
      let app = express();
      mongoose.connect(this.settings.mongo);
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

})();
