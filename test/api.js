(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  var http = require('http');

  describe('GET /api', function(){
    it('should respond 200 when getting root api', function(done){
      let cervo = new Cervo();
      cervo.run();
      http.get('http://localhost:8080/', function (res) {
        should(res.statusCode).be.equal(200);
      });
      done();
    });

    it("should respond 404 when getting toto", function(done){
      let cervo = new Cervo();
      cervo.run();
      http.get('http://localhost:8080/toto', function(done){
        should(res.statusCode).be.equal(404);
      });
      done();
    });

  });
})();
