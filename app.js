const express = require('express');

const app = express();
const router = express.Router();
const croneService = require('./services/croneService');
const agendaService = require('./services/agendaService');
const pdfmakeService = require('./services/pdfmakeService');
const mailingService = require('./services/mailing');
const logger = require('./helper/logger');

const models = require('./models');

app.use(router);
app.listen(8080, function() {
  logger.log('info', 'Agenda en marcha...');
  let job =  new agendaService().ejecutarServicio();
});
