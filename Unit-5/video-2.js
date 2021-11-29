
'use strict'

const logger = require('../common/logger');

const { MAINLINE, START, END } = require('../common/constants');

(function mainline() {
    logger.info(START, MAINLINE);
    
    process.nextTick(() => {
        logger.info('mainline:process.nextTick() says: hello!', 'MICROTASK')
    });

    let iteration = 0;
    let intervalTimeout = setInterval(() => {
        if (iteration < 3) {
            logger.info('setInterval(' + iteration + ') says: Hello!', 'TIMERS');
        } else {
            logger.info('setInterval(' + iteration + ') says: Goodbye!', 'TIMERS');
            clearInterval(intervalTimeout);
        }
        iteration++;
    });

    logger.info(END, MAINLINE)
})();
