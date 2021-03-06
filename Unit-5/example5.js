
'use strict'

const fs = require('fs');

const logger = require('../common/logger');

// Max number of iterations to perform
const ITERATIONS_MAX = 2;

// Iteration counter
let iteration = 0;

process.nextTick(() => {
    // Microtask callback runs AFTER mainline, even though the code is here
    logger.info('process.nextTick', 'MAINLINE MICROTASK');
});

logger.info('START', 'MAINLINE');

const timeout = setInterval(() => {
    logger.info('START iteration ' + iteration + ': setInterval', 'TIMERS PHASE');

    if (iteration < ITERATIONS_MAX) {
        setTimeout((iteration) => {
            logger.info('TIMER EXPIRED (from iteration ' + iteration + '): setInterval.setTimeout', 'TIMERS PHASE');
            process.nextTick(() => {
                logger.info('setInterval.setTimeout.process.nextTick', 'TIMERS PHASE MICROTASK');
            });
        }, 0, iteration);
        fs.readdir('../data', (err, files) => {
            logger.info('fs.readdir() callback: Directory contains: ' + files.length + ' files', 'POLL PHASE');
            process.nextTick(() => {
                logger.info('setInterval.fs.readdir.process.nextTick', 'POLL PHASE MICROTASK');
            });
        });
        setImmediate(() => {
            logger.info('setInterval.setImmediate', 'CHECK PHASE');
            process.nextTick(() => {
                logger.info('setInterval.setTimeout.process.nextTick', 'CHECK PHASE MICROTASK');
            });
        });
    } else {
        logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        // Kill the interval timer
        clearInterval(timeout);
    }
    logger.info('END iteration ' + iteration + ': setInterval', 'TIMERS PHASE');

    iteration++;
}, 0);

logger.info('MAINLINE: END');
