const express = require('express');

const app = express();
const router = express.Router();
const croneService = require('./services/croneService');
const pdfmakeService = require('./services/pdfmakeService');
const mailingService = require('./services/mailing')
const logger = require('./helper/logger');

const models = require('./models');
const docs = require('./docs');

app.use(router);
app.listen(8080, function(){

  let job = new croneService().ejecutarServicio();
  logger.log('info', 'Cron en marcha...');

  let json = '['+
    '{ "id": "1BFS18", "nombre": "Víctor", "apellido1": "Vanaclocha", "apellido2": "Cebrián", "correo": "victorvace95@gmail.com", "curso": "Bootcamp Full Stack Developer",  "codigo": "abc123", "enviado":false },'+
    '{ "id": "2BFS18", "nombre": "Juan Diego", "apellido1": "Martín-Blas", "apellido2": "Ramos", "correo": "victorvace_95@hotmail.es", "curso": "Pro Developer", "codigo": "123abc", "enviado":false },'+
    '{ "id": "3BFS18", "nombre": "Xavi", "apellido1": "Rodríguez", "apellido2": "Soler", "correo": "vicvace@campusaula.com", "curso": "Genius Full Stack Developer Profesional", "codigo": "a1b2c3", "enviado":false }'+
    ']';

    let objJSON = JSON.parse(json);

    console.log(objJSON);



});
