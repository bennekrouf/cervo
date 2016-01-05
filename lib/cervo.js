#!/usr/bin/env node --use_strict
(() => {

  "use strict";

  let express     = require('express'),
  bodyParser      = require('body-parser'),
  morgan          = require('morgan'),
  mongoose        = require('mongoose');

  let publicRouter = require('./api/public');
  let securedRouter = require('./api/secured');

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
    app.use('/public', publicRouter);
    app.use('/secured', securedRouter);

    this.settings = settings;
    this.app = app;

    this.run = () => {
        // DB Connection
        if(settings.mongo) {
          mongoose.connect(settings.mongo);
          app.set('SECRET_VAR', settings.secret || "secret");
        }
        app.listen(settings.port, ()=>{
          console.log(`Run - Server started at ${settings.port}.`);
        });
    };

    this.dropCollection = collec => {
      mongoose.connection.db.dropCollection(collec, function(err, result) {
        console.log(`flush ${collec} ${err} ${result}`);
      });
    };

    this.get = args => {
      publicRouter.get(args, (req,res) => {
        console.log(`In the pget with args : ${args}`);
        res.send({success: true});
      });
    };

    this.sget = args => {
      console.log(`in the secured get`);
      securedRouter.get(args, (req, res)=> {
        res.send({success: true});
      });
    };

    this.stop = () => {
      console.log(`Server stopped at ${settings.port}.`);
    };
  };
})();
