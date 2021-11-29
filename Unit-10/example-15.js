
// Example 15 - Multiple log levels
// require Log4js
const log4js = require('log4js');

// Create the logger
const logger = log4js.getLogger();
// Let's see ALL of the levels!
logger.level = 'trace';

// Log a message
logger.trace('Trace, log4js!');
logger.debug('Debug, log4js!');
logger.info('Hello, log4js!');
logger.warn('Heads up, log4js!');
logger.error('Danger, log4js!');
logger.fatal('Fatal, log4js!');
