
// Example 17 - Log Categories
// require log4js
const log4js = require('log4js');

// The module is a category (functional area)
const MODULE = 'example-17';

const defaultLogger = log4js.getLogger();
defaultLogger.level = 'info';
defaultLogger.info('Beginning program execution...');

// Logger configuration
log4js.configure('./config/log4js-config.json');

// Module-specific logger
const moduleLogger = log4js.getLogger(MODULE);

// Log a message with the default logger
moduleLogger.info('Howdy, Log4js!');
moduleLogger.warn('WARNING, Log4js!');
moduleLogger.error('ERROR, Log4js!');

// Add some more categories
const FOO = 'foo';
const BAR = 'bar';

// Get references to them and log a message
const fooLogger = log4js.getLogger(FOO);
fooLogger.info('Howdy, Log4js!');

const barLogger = log4js.getLogger(BAR);
barLogger.info('Howdy, Log4js!');

defaultLogger.info('Program terminated.');
