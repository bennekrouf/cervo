(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  var request = require('request');
  var http = require('http');

  describe('GET /api', ()=>{

    it("should return a token", function(done){
      let cervo = new Cervo({
          port: '3000',
          secret : 'bennekrouf',
        	mongo : 'mongodb://admin:admin@waffle.modulusmongo.net:27017/iseM9apu'
        });

      cervo
      .run()
      .then((res,brk)=>{
        console.log("After the run", res, brk);
        cervo.stop();
        done();
      }, (error) => {
        console.log("Error in run return:", error);
        cervo.stop();
        done();
      })
      .catch((error)=>{
        console.log("In the catch:", error);
        cervo.stop();
        done();
      });

//      cervo.stop();
//      done();

      http.get('http://localhost:3000/setup', res=>{
        should(res.statusCode).be.equal(200);
        cervo.stop();
        done();
      }, error=>{
        console.log(`http get error ${error}`);
      });

      //  request.post('http://localhost:3000/signup?name=toto&password=toto',
      // // {json: {'name' :'toto', 'password':'toto'}},
      // function(error, res, body){
      //   console.log("error:", error);
      //   // should(res.statusCode).be.equal(500);
      // });
    });

  });
})();
