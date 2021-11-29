
// Example 14 - External configuration (log4js-config.json)
// require log4js
const log4js = require('log4js');

// Logger configuration
log4js.configure('./config/log4js-config.json');

// Default logger
const logger = log4js.getLogger();

// Log a message with the default logger
logger.info('Howdy, Log4js!');
