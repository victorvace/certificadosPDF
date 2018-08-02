const winston = require('winston');

  var helperlogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'logs/filelog.log' })
    ]
  });


module.exports = helperlogger;
