var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

const pdfamkerService = require('../services/pdfmakeService');

describe('Generación pdf', function(){
  describe('Iniciación de objeto', ()=>{
    it('Debe devolver un objeto a la hora de instarciar la clase', ()=> {
      let object = pdfamkerService.generarCertificado();
      assert.equal(object, Object);
      assert.equal(object.info.title,'Certificado de obtención');
    })
  })
});
