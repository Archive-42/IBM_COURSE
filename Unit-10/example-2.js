
// Example 2 - File transport
// require Winston
const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './logs/example-2.log'
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

// Log a message
logger.info('Hello, Winston!');
