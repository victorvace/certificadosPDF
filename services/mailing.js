const nodemailer = require('nodemailer');
const logger = require('../helper/logger');

function mailingService(mail, codigo){

let transporter = nodemailer.createTransport({
        host: '',//ej: smtp.gmail.com
        auth: {
            user: '',
            pass: ''
        }
});

let mailOptions = {
    from: 'masterofchaostr@gmail.com',
    to: mail,
    subject: 'Certificado del curso',
    text: 'Obtención del certificado',
    html: '<p>Has recibido tu certificado</p>',
    attachments: {
      path: 'PDF/GeeksHubsAcademyCertificate'+codigo+'.pdf'
    }
  }

transporter.sendMail(mailOptions, function(err, info){
    if(err){
      logger.log('error','Error con el servidor de mail.');
      console.log(err);
    } else{
      logger.log('info','Certificado enviado a: ' + mail);
    }
  });

}

module.exports = mailingService;
