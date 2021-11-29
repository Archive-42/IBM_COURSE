
// Example 13 - External configuration (app-settings.js)
// require log4js
const log4js = require('Log4js');

// App settings
const { traceLogConfig } = require('./config/app-settings').log4js;

// Logger configuration
log4js.configure(traceLogConfig);

// Create the logger
const logger = log4js.getLogger();

// Log a message
logger.trace('Trace, Log4js!');
logger.debug('Debug, Log4js!');
logger.info('Hello, Log4js!');
logger.warn('Heads up, Log4js!');
logger.error('Danger, Log4js!');
logger.fatal('Fatal, Log4js!');
