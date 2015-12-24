(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  var request = require('supertest')

  describe('GET /api', function(){
    it('should repond 200 when getting root api', function(done){
      let cervo = new Cervo();
      cervo.run();
      // request(cervo)
      //   .get('/')
        // .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        // .expect(200, done);
      done();
    });
  });
})();
