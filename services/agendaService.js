let CronJob = require('cron').CronJob;

const express = require('express');
const app = express();

const Agenda = require('agenda');
const Agendash = require('agendash');

const logger = require('../helper/logger');

const pdfmakeService = require('./pdfmakeService');
const mailingService = require('./mailing')

const models = require('../models');

function agendaService(){

  this.ejecutarServicio = function(){

    let mongoConnectionString = 'mongodb://127.0.0.1:32768/agenda';
    let agenda = new Agenda({db: {address: mongoConnectionString}});

    app.use('/dash', Agendash(agenda));
    logger.log('info', 'Agendash iniciado...');

    agenda.define('startJob', function(job, done) {
      //job.repeatAt('09:30pm');
      logger.log('info','Tarea iniciada.');

      let json = '['+
        '{ "id": "1BFS18", "nombre": "Víctor", "apellido1": "Vanaclocha", "apellido2": "Cebrián", "correo": "xavi@geekshubs.com", "curso": "Bootcamp Full Stack Developer",  "codigo": "abc123", "enviado":false },'+
        '{ "id": "2BFS18", "nombre": "Juan Diego", "apellido1": "Martín-Blas", "apellido2": "Ramos", "correo": "xavi@geekshubs.com", "curso": "Noob Developer", "codigo": "123abc", "enviado":false },'+
        '{ "id": "2BFS18", "nombre": "Iván", "apellido1": "Ruíz", "apellido2": "Rosello", "correo": "xavi@geekshubs.com", "curso": "Programación de videojuegos", "codigo": "a2b3c1", "enviado":false },'+
        '{ "id": "3BFS18", "nombre": "Xavi", "apellido1": "Rodríguez", "apellido2": "Soler", "correo": "xavi@geekshubs.com", "curso": "Genius Full Stack Developer Profesional", "codigo": "a1b2c3", "enviado":false }'+
        ']';
        //xavi@geekshubs.com
        //'{ "id": "2BFS18", "nombre": "Javier", "apellido1": "Olmo", "apellido2": "Alario", "correo": "javi@geekshubs.com", "curso": "Groud Hacking", "codigo": "123abc", "enviado":false },'+

      let objJSON = JSON.parse(json);

      function moverObjeto(miCallback){
        miCallback(objJSON);
      }

      for (let i = 0; i < objJSON.length; i++) {
        function movNum(numBack){
          numBack(i);
        }

        models.user.findOne({
          where:{
            correo: objJSON[i].correo,
            curso: objJSON[i].curso
          }
        }).then(function(user){
          moverObjeto(function(objJSON){
            let i;
            movNum(function(a){
              i = a;
            })
            if(user === null || (user.enviado === false && user.correo !== objJSON[i].correo && user.curso !== objJSON[i].curso)) {

              let certificado = new pdfmakeService(objJSON[i]);
              logger.log('info','Certificado número ' + (i+1) + ' listo para enviar. (' + objJSON[i].codigo + ').');

              let user = models.user.build({
                nombre: objJSON[i].nombre,
                apellido1: objJSON[i].apellido1,
                apellido2: objJSON[i].apellido2,
                correo: objJSON[i].correo,
                curso: objJSON[i].curso,
                codigo: objJSON[i].codigo,
                enviado: true
              });

              user.save().then(function(newUser){
                logger.log('info', newUser.nombre + ' (guardado)');
              });
            } else {
              logger.log('warn', 'Registro de  ' + objJSON[i].correo + ', ya enviado.');
            }
          })
        })
      }
      done();
    });

    agenda.on('ready', function() {
      console.log("Entra");
      agenda.every('1 minute', 'startJob');
      agenda.start();
    });
    agenda.on('complete', function(startJob) {
      console.log('startJob finished');
    });

  }
};

module.exports = agendaService;
