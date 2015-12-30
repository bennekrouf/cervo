(()=> {
  'use strict';

  let express   = require('express'),
  jwt           = require('jsonwebtoken');

  function _loadSecuredRoutes(app, settings){
    // Secured routes
    let apiRoutes = express.Router();
    app.use('/api', apiRoutes);

    apiRoutes.use( (req, res, next) => {
      console.log(req);
      // search the token
      let token = req.body.token || req.query.token || req.headers['x-access-token'];

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
    });

    apiRoutes.get('/', (req,res) => {
      res.json({
        message: 'welcome !!!'
      });
    });

    apiRoutes.get('/users', (req,res) => {
      User.find({}, function(err, users){
        res.json(users);
      });
    });

    apiRoutes.post('/signin', (req,res) => {

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
  }

  module.exports = _loadSecuredRoutes;

})();
