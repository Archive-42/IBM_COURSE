
'use strict'

const logger = require('../common/event-logger');

const { MAINLINE, START, END } = require('../common/constants');

(function mainline() {
    logger.info(START, MAINLINE);
    // Do nothing
    logger.info(END, MAINLINE)
})();
