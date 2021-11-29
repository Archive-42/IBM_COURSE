
// Example 4 - External configuration (app-settings.js)
// require Winston
const winston = require('winston');

// App settings
const { sillyLogConfig } = require('./config/app-settings').winston;

// Create the logger
const logger = winston.createLogger(sillyLogConfig);

// Log some messages
logger.silly('Trace message, Winston!');
logger.debug('Debug message, Winston!');
logger.verbose('A bit more info, Winston!');
logger.info('Hello, Winston!');
logger.warn('Heads up, Winston!');
logger.error('Danger, Winston!');
