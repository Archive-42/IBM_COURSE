
'use strict'

const fs = require('fs');

const logger = require('../common/logger');

// Max number of iterations to perform
const ITERATIONS_MAX = 3;

// Iteration counter
let iteration = 0;

logger.info('START', 'MAINLINE');

const timeout = setInterval(() => {
    logger.info('START: setInterval', 'TIMERS PHASE');

    if (iteration < ITERATIONS_MAX) {
        setTimeout(() => {
            logger.info('TIMERS PHASE', 'setInterval.setTimeout');
        });
        fs.readdir('../data', (err, files) => {
            if (err) throw err;
            logger.info('fs.readdir() callback: Directory contains: ' + files.length + ' files', 'POLL PHASE');
        });
    } else {
        logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        // Kill the interval timer
        clearInterval(timeout);
    }
    iteration++;

    logger.info('END: setInterval', 'TIMERS PHASE');
}, 0);

logger.info('END', 'MAINLINE');
