
// Example 10 - Console appender
// require Log4js
const log4js = require('log4js');

// Create the logger
const logger = log4js.getLogger();
logger.level = 'info';

// Log a message
logger.info('Hello, log4js!');
