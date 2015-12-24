(()=>{
  'use strict';
  var should = require('should');
  var Cervo = require('../');
  describe('basic', function(){
    it('should create the server with a default port', function(done){

      let cervo = new Cervo();
      console.log(cervo);
      should(cervo).have.property('settings');
      should(cervo.settings).have.property('port');
      done();

    });
  });
})();
