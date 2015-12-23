(()=> {

  'use strict';

  let User = require('./user'),
  jwt      = require('jsonwebtoken');

  function _loadNonSecuredRoutes(app, settings){

    app.get('/', (req,res) => {
       res.send('Welcome to the bot API http://localhost:' +settings.port+ '/api');
    });

    // Create a sample user
    app.get('/setup', (req,res) => {
      var nick = new User({
        name: 'Nicky Larson',
        password: 'password',
        admin: true
      });

      nick.save((err,val) => {
        if(err) throw err;
        console.log('User saved success');
        res.json({success: val});
      });
    });

    app.post('/signup', (req, res) => {

      console.log(req.body);

      let user = new User({
        name:req.body.name,
        password:req.body.password
      });

      var token = jwt.sign(user, app.get('SECRET_VAR'), {expiresIn: 60*60*10});
      user.save(err => {
        if(err) throw err;
        console.log("user created");
        res.json({
          success:true,
          token: token
        });
      });
    });

  }

  module.exports = _loadNonSecuredRoutes;
})();
