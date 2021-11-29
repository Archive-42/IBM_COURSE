
// Example 5 - Multiple log levels
// require Winston
const winston = require('winston');

// Logger configuration
const logConfiguration = {
    transports: [ 
        new winston.transports.Console({
            level: 'error'
        }) 
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);
// Let's see ALL the log levels
logger.transports[0].level = 'silly';

// Log some messages
logger.silly('Trace message, Winston!');
logger.debug('Debug message, Winston!');
logger.verbose('A bit more info, Winston!');
logger.info('Hello, Winston!');
logger.warn('Heads up, Winston!');
logger.error('Danger, Winston!');
