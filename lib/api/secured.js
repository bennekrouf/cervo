(()=> {
  'use strict';

  const jwt     = require('jsonwebtoken');
  const express = require('express');
  let router = express.Router();

  router.get('/', (req, res) => {
    res.send('Welcome on secured API !!!');
  });

  router.use( (req, res, next) => {
    console.log(`checking token`);
    // search the token
    let token = getToken(req);
    return checkToken(req, res);
  });

  function getToken(req){
    return req.body.token || req.query.token || req.headers['x-access-token'];
  }

  function checkToken(req, res){
    let token = getToken(req);

    if(token) {
      jwt.verify(token, app.get('SECRET_VAR'), (err, decoded) => {
        if(err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } else {
      return res.status(403).send({
        success:false,
        message: 'No token provided'
      });
    }
  }

  router.get('/users', (req,res) => {
    User.find({}, function(err, users){
      res.json(users);
    });
  });

  router.post('/signin', (req,res) => {

    User.findOne({
      name: req.body.name
    }, function(err, user){
      if(err) throw err;

      if(!user){
        res.json({
          success: false,
          message: 'Authent failded. User not found'
        });
      } else if(user){

        if(user.password != req.body.password) {
          res.json({
            success:false,
            message: 'Authent failed. Wrong pass'
          });
        } else {
          var token = jwt.sign(user, app.get('bennekrouf'), {expiresIn: 60*60*10});
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });

        }
      }
    });
  });

  module.exports = router;

})();
