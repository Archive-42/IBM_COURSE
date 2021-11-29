
// Example 16 - Formatting
// require log4js
const log4js = require('log4js');

// The Logger Category (functional area)
const CATEGORY = 'example-16';

// Logger configuration
log4js.configure({
    appenders: { 
        consoleAppender: { 
            type: 'console', 
            layout: { 
                type: 'pattern', 
                pattern: '%d - %c:[%p]: %m' 
            } 
        } 
    },
    categories: { default: { appenders: ['consoleAppender'], level: 'info' } }
});

// Create the logger
const logger = log4js.getLogger(CATEGORY);

logger.info('Howdy, Log4js!');
