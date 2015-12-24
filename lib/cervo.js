#!/usr/bin/env node --use_strict
(() => {

  "use strict";

  var express     = require('express'),
  bodyParser      = require('body-parser'),
  morgan          = require('morgan'),
  mongoose        = require('mongoose');

  const loadSecured = require('./api/secured');
  // const loadNonsecured = require('./api/nonsecured');
  // let Model = require('./model');
  // Cervo.prototype.model = Model;

  module.exports = Cervo;

  function Cervo(settings) {
    if(!settings) settings = {};
    this.settings = settings;
    this.settings.port = this.settings.port || process.env.PORT || 8080;
  }

  Cervo.prototype.run = function() {

      const port = this.settings.port;
      let app = express();
      if(this.settings.mongo) {
        mongoose.connect(this.settings.mongo);
        app.set('SECRET_VAR', this.settings.secret || "secret");
      }
      app.use(bodyParser.urlencoded({
      	extended: false
      }));

      app.use(bodyParser.json());
      app.use(morgan('dev'));
     app.listen(port);

     loadSecured(app, this.settings);
    //  loadNonsecured(app, this.settings);

      console.log('Magic at http://localhost:'+port);
  };

})();
