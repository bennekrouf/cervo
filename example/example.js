'use strict';

let Cervo = require('cervo');
let settings = {
  port: '8080',
  secret : 'bennekrouf',
	database : 'mongodb://admin:admin@waffle.modulusmongo.net:27017/iseM9apu'
};

let cervo = new Cervo(settings);
cervo.run();
