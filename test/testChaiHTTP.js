let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8080';

describe('Pedir JSON: ',()=>{

	it('Obtener JSON', (done) => {
		chai.request(url)
			.post('/lista')
			.send({})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});
