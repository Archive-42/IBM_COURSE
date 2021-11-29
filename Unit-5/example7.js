
'use strict'

// The Node EventEmitter
const EventEmitter = require('events');
// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// The common logger
const logger = require('../common/logger');

logger.info('START', 'MAINLINE');

logger.info('Registering simpleEvent handler', 'MAINLINE');
eventEmitter.on('simpleEvent', (eventName, message, source, timestamp) => {
    logger.info('Received event: ' + timestamp + ': ' + source + ':[' + eventName + ']: ' + message, 'EventEmitter.on()');
});

// Get the current time
let hrtime = process.hrtime();
eventEmitter.emit('simpleEvent', 'simpleEvent', 'Custom event says what?', 'MAINLINE', (hrtime[0] * 1e9 + hrtime[1] ) / 1e6);

logger.info('END', 'MAINLINE');
