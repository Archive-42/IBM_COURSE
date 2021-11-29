
// Example 6 - Custom Log Levels
// require Winston
const winston = require('winston');

// Custom log levels
const noteLevels = {
    values: {
        doe: 10,
        ray: 20,
        me: 30,
        far: 40,
        sew: 50,
        la: 60,
        tea: 70
    }
};

// Logger configuration
const logConfiguration = {
    level: 'far',
    levels: noteLevels.values,
    transports: [
        new winston.transports.Console()
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

/**
 * 
 */
function doLogging() {
    // Log some messages
    logger.tea('Tea, Winston!');
    logger.la('La, Winston!');
    logger.sew('Sew, Winston!');
    logger.far('Far, Winston!');
    logger.me('Me, Winston!');
    logger.ray('Ray, Winston!');
    logger.doe('Doe, Winston!');
}

// Do some logging as the logger was setup
logger.doe(`Logging messages, current log level: ${logger.level}`);
doLogging();

// Now modify the level
logger.level = 'tea';
logger.doe(`Logging messages, current log level: ${logger.level}`);
doLogging();

try {
    logger.info('The previously used log methods no longer work!');
} catch (err) {
    logger.doe(`${err.message}`);
}
