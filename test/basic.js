(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  describe('basic', function(){

    it('should create the server with a default port', function(done){
      let cervo = new Cervo();
      should(cervo).have.property('settings');
      should(cervo.settings).have.property('port');
      done();
    });

    it('should create the server with a specific settings', function(done){
      const sport = 'sport';
      let cervo = new Cervo({
        port:3400
      });
      console.log(`cervo settings : ${cervo}`);
      should(cervo.settings.port).be.equal(3400);
      done();
    });

  });
})();
