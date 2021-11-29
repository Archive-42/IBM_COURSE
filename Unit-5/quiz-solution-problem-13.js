
'use strict'

const fs = require('fs');

const logger = require('../common/event-logger');

(function mainline() {
    const ITERATIONS_MAX = 3;

    let iterationNumber = 0;

    let intervalTimeout = setInterval(() => {
        if (iterationNumber < ITERATIONS_MAX) {
            fs.readdir('../data', (err, files) => {
                logger.info('setInterval.fs.readdir', 'POLL');
                // In poll phase
                process.nextTick(() => {
                    logger.info('setInterval.fs.readdir.process.nextTick', 'POLL MICROTASK');
                });
                setTimeout(() => {
                    logger.info('setInterval.fs.readdir.setTimeout', 'TIMERS');
                    process.nextTick(() => {
                        logger.info('setInterval.fs.readdir.setTimeout.process.nextTick', 'TIMERS MICROTASK')
                    });
                });
                setImmediate(() => {
                    logger.info('setInterval.fs.readdir.setImmediate', 'CHECK');
                    process.nextTick(() => {
                        logger.info('setInterval.fs.readdir.setImmediate.process.nextTick', 'CHECK MICROTASK')
                    });
                });
            });
        } else {
            clearInterval(intervalTimeout);
        }
        iterationNumber++;
    });
})();
