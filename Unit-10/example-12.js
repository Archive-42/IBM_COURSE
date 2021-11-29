
// Example 12 - Multiple appenders
// require Log4js
const log4js = require('log4js');

// Logger configuration
log4js.configure({
    appenders: { 
        fileAppender: { type: 'file', filename: './logs/example-12.log' },
        console: { type: 'console' } 
    },
    categories: { 
        default: { appenders: ['fileAppender', 'console'], level: 'error' } 
    }
});

// Create the logger
const logger = log4js.getLogger();

// Log a message
logger.trace('Trace, log4js!');
logger.debug('Debug, log4js!');
logger.info('Hello, log4js!');
logger.warn('Heads up, log4js!');
logger.error('Danger, log4js!');
logger.fatal('Fatal, log4js!');
