(()=> {

  'use strict';

  let User = require('./user'),
  jwt      = require('jsonwebtoken');

  const express = require('express');
  let router = express.Router();

  router.use(function timelog(req, res, next){
    console.log(`Time: ${Date.now()}`);
    next();
  });

  router.get('/', (req, res) => {
    res.send('Welcome on public API');
  });
  
  router.get('/setup', (req,res) => {
    let larson = new User({
      name: 'Nicky Larson',
      password: 'password',
      admin: true
    });

    larson.save((err,val) => {
      console.log("callbacl save");
      if(err) throw err;
      res.json({success: val});
    });
  });

  router.get('/users', (req,res) => {
    User.find({}, function(err, users){
      console.log('in the find');
      res.json(users);
    });
  });

  router.post('/signup', (req, res) => {
    let user = new User({
      name:req.body.name,
      password:req.body.password
    });
    var token = jwt.sign(user, "secret", {expiresIn: 60*60*10});
    console.log(`trying to create user ${req.body.name}`);
    user.save(err => {
      if(err){
        console.log("Error while creating user", err);
        throw err;
      } else {
        console.log(`User ${req.body.name} sucessfully created.`);
        res.send({
          success:true,
          token: token
        });
      }
    });
  });

  module.exports = router;
})();
