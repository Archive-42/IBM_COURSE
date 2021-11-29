
// Example 9 - Multiple categories
// Get logger from external configuration source
const winstonConfig = require('./config/winston-config');

// require Winston
const winston = require('winston');

let defaultLogger = winstonConfig.defaultLogger;
defaultLogger.info('Beginning program execution...');

// The module is a category (functional area)
const MODULE = 'example-9';

// Add another logger with the category specific to this module
winston.loggers.add(MODULE, winstonConfig.createLoggerConfig(MODULE));
// Module-specific logger
const moduleLogger = winston.loggers.get(MODULE);

// Log messages with the module-specific logger
moduleLogger.info('Howdy, Winston!');
moduleLogger.warn('WARNING, Winston!');
moduleLogger.error('ERROR, Winston!');

// Add some more categories
const FOO = 'foo';
const BAR = 'bar';

// Add their log configurations
winston.loggers.add(FOO, winstonConfig.createLoggerConfig(FOO));
winston.loggers.add(BAR, winstonConfig.createLoggerConfig(BAR));

// Get references to them and log a message
const fooLogger = winston.loggers.get(FOO);
fooLogger.info('Howdy, Winston!');

const barLogger = winston.loggers.get(BAR);
barLogger.info('Howdy, Winston!');

defaultLogger.info('Program terminated.');
