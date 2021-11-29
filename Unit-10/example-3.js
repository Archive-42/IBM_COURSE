
// Example 3 - Multiple transports
// require Winston
const winston = require('winston');

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'verbose'
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/example-3.log'
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

// Log some messages
logger.silly('Trace message, Winston!');
logger.debug('Debug message, Winston!');
logger.verbose('A bit more info, Winston!');
logger.info('Hello, Winston!');
logger.warn('Heads up, Winston!');
logger.error('Danger, Winston!');
