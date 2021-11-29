
// Example 7 - Formatting - printf
// require Winston
const winston = require('winston');

// The Logger Category (functional area)
const CATEGORY = 'example-7';

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({ 
            label: CATEGORY
        }),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
        })
    )
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

logger.info('Howdy, Winston!');
