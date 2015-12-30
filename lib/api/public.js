(()=> {

  'use strict';

  let User = require('./user'),
  jwt      = require('jsonwebtoken');

  module.exports = _loadPublicRoutes;

  function _loadPublicRoutes(app, settings){
    app.get('/', (req,res) => {
       res.send('Welcome to API http://localhost:' +settings.port+ '/api');
    });

    // Create a sample user
    app.get('/setup', (req,res) => {
      // let larson = new User({
      //   name: 'Nicky Larson',
      //   password: 'password',
      //   admin: true
      // });
      //
      // larson.save((err,val) => {
      //   console.log("callbacl save");
      //   if(err) throw err;
      //   res.json({success: val});
      // });
      console.log("In the setup endpoint");
      res.json({success: true});
    });

    app.post('/signup', (req, res) => {
      let user = new User({
        name:req.body.name,
        password:req.body.password
      });

      var token = jwt.sign(user, app.get('SECRET_VAR'), {expiresIn: 60*60*10});
      user.save(err => {
        if(err) throw err;
        res.json({
          success:true,
          token: token
        });
      });
    });
  }
})();
