
// Example 8 - Formatting - splat
// require Winston
const winston = require('winston');

// The Logger Category (functional area)
const CATEGORY = 'example-8';

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    )
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

logger.warn('%d - %s: Howdy, Winston!', Date.now(), CATEGORY);
