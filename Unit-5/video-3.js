
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
            setTimeout((iteration) => {
                logger.info('setInterval(' + iteration + '):setTimeout() says: Timer expired!', 'TIMERS');
                process.nextTick((iteration) => {
                    logger.info('setInterval():setTimeout(' + iteration + '):process.nextTick() says: Delimit TIMERS phase!', 'MICROTASK');
                }, iteration);
            }, 0, iteration);
        } else {
            logger.info('setInterval(' + iteration + ') says: Goodbye!', 'TIMERS');
            clearInterval(intervalTimeout);
        }
        iteration++;
    });

    logger.info(END, MAINLINE)
})();
