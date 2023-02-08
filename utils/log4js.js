const log4js = require('log4js');
const dotenv = require('dotenv');
dotenv.config();

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'log/error.log' },
    archivoWarn: { type: 'file', filename: 'log/warn.log' },
    loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
    loggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' },
    loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
},
  categories: {
    default: {
      appenders: ['loggerConsola'], 
      level: 'all'
    },
    prod: {
      appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarn'], level:'all'
    }
  }
});

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod');
} else {
  logger = log4js.getLogger();
}

module.exports = logger;
