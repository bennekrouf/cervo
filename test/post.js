(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  var request = require('request');
  var http = require('http');

  describe('GET /api', function(){

    it("should return a token", function(done){
      let cervo = new Cervo({
          port: '3000',
          secret : 'bennekrouf',
        	mongo : 'mongodb://admin:admin@waffle.modulusmongo.net:27017/iseM9apu'
        });

      cervo
      .run()
      .then(function(res,brk){
        console.log("After the run", res, brk);
        cervo.stop();
        done();
      }, function(error){
        console.log("Error in run return:", error);
        cervo.stop();
        done();
      })
      .catch(function(error){
        console.log("In the catch:", error);
        cervo.stop();
        done();
      });

//      cervo.stop();
//      done();

      http.get('http://localhost:3000/setup', function (res) {
        console.log("res :", res);
        should(res.statusCode).be.equal(200);
        cervo.stop();
        done();
      }, function(error){
        console.log(`http get error ${error}`);
      });

      done();

      //  request.post('http://localhost:3000/signup?name=toto&password=toto',
      // // {json: {'name' :'toto', 'password':'toto'}},
      // function(error, res, body){
      //   console.log("error:", error);
      //   // should(res.statusCode).be.equal(500);
      // });
    });

  });
})();
