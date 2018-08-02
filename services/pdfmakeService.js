const PdfPrinter = require('pdfmake');

const fs = require('fs');
const mailingService = require('./mailing');
const logger = require('../helper/logger');
var certificado = require('../docs/certificadoFormacion.js');

let fonts = {
	Roboto: {
		normal: 'fonts/Roboto/Roboto-Light.ttf',
		bold: 'fonts/Roboto/Roboto-Bold.ttf'
		//normal, bold, italics, bolditalics
	},
  BreeSerif: {
    normal: 'fonts/Bree_Serif/BreeSerif-Regular.ttf'
  }
};

const printer = new PdfPrinter(fonts);

function pdfmakeService(objJSON){

			var documento = new certificado(objJSON);
			documento.configurarCertificado();
			let doc = documento.generarCertificado(function (cb){

			let docm = cb;

				let pdfDoc = printer.createPdfKitDocument(docm);
				let testingPDF = pdfDoc.pipe(fs.createWriteStream('PDF/GeeksHubsAcademyCertificate'+ objJSON.codigo +'.pdf'));
				logger.log('info','Certificado generado.');
				testingPDF.on('finish', function() {
					let emailenvio = new mailingService(objJSON.correo, objJSON.codigo);
				});
				testingPDF.on('error', function() {
					logger.log('error','Error en el envío de Certificado');
				});
				pdfDoc.end();

			});
		}

module.exports = pdfmakeService;
