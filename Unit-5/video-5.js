
'use strict'

const fs = require('fs');

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
            fs.readdir(require('../settings/app-settings').common.dataDirectory, (err, files) => {
                logger.info('setInterval():fs.readdir() says: Directory contains: ' + files.length + ' files!', 'POLL');
                process.nextTick(() => {
                    logger.info('setInterval():fs.readdir():process.nextTick() says: Delimit POLL phase!', 'MICROTASK');
                });
                setImmediate(() => {
                    logger.info('setInterval():fs.readdir():setImmediate() says: Poll phase must be idle!', 'CHECK');
                    process.nextTick(() => {
                        logger.info('setInterval():fs.readdir():setImmediate():process.nextTick() says: Delimit CHECK phase!', 'MICROTASK');
                    });
                });
            });
        } else {
            logger.info('setInterval(' + iteration + ') says: Goodbye!', 'TIMERS');
            clearInterval(intervalTimeout);
        }
        iteration++;
    });

    logger.info(END, MAINLINE)
})();
