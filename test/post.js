(()=>{
  'use strict';
  const should = require('should'),
  Cervo = require('../'),
  request = require('request'),
  http = require('http');

  describe('GET /api', ()=>{

    it(`should define a public route`, done => {

      let cervo = new Cervo({
          port: '3001'
          // ,secret : 'bennekrouf',
        	// mongo : 'mongodb://admin:admin@waffle.modulusmongo.net:27017/iseM9apu'
        });

      cervo.pget('/titi', function(req, res){
        console.log(`Callback pget`);
        res.json({success : true});
      });
      cervo.run();

      console.log(`After the cervo.run()`);

      http.get('http://localhost:3000/titi', result=>{
        console.log("Return from get titi");
        should(res.statusCode).be.equal(205);
        cervo.stop();
        done();
      }, error=>{
        console.log(`http get error ${error}`);
      });

      //  request.post('http://localhost:3000/signup',
      //  {json: {'name' :'toto', 'password':'toto'}},
      //  (error, res, body) => {
      //     cervo.stop();
      //     console.log("Returns from post :", error, res, body);
      //     // should(res.statusCode).be.equal(500);
      //     done();
      // });
      done();
    });
  });
})();
