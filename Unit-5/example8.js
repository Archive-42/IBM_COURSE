
'use strict'
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// EventInfo module
const { EventInfo } = require('../common/event-info');
// Event Logger module
const logger = require('../common/event-logger');
// Simple utilities module
const simpleUtils = require('../common/simple-utils');

// Constants (from constants module)
const { MAINLINE, START, END } = require('../common/constants');

// The custom event name
const EVENT_NAME = 'simpleEvent';

/**
 * The mainline function.
 */
(function mainline() {

    logger.info(START, MAINLINE);

    logger.info('Registering ' + EVENT_NAME + ' handler', MAINLINE);
    eventEmitter.on(EVENT_NAME, (eventInfo) => {
        logger.info('Received event: ' + eventInfo.toString(), 'EventEmitter.on()');
    });
    // Emit the event
    eventEmitter.emit(EVENT_NAME, new EventInfo(EVENT_NAME, 'Custom event says what?', MAINLINE, simpleUtils.hrtimeToMillis(process.hrtime())));
    
    logger.info(END, MAINLINE);

})();
