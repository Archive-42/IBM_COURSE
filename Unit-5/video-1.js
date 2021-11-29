
'use strict'

const logger = require('../common/logger');

const { MAINLINE, START, END } = require('../common/constants');

(function mainline() {
    logger.info(START, MAINLINE);
    
    process.nextTick(() => {
        logger.info('mainline:process.nextTick() says: hello!', 'MICROTASK')
    });

    logger.info(END, MAINLINE)
})();
