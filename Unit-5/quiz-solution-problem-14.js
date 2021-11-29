
'use strict'
const logger = require('../common/event-logger');
const simpleUtils = require('../common/simple-utils');

(function mainline() {
    const ITERATIONS_MAX = 6;

    var iterationNumber = 0;
    
    var intervalTimeout = setInterval((startTime) => {
        
        let currentTime = simpleUtils.hrtimeToMillis(process.hrtime());

        if (iterationNumber < ITERATIONS_MAX) {
            logger.info('Elapsed time: ' + (currentTime - startTime), 'setInterval callback');
        } else {
            clearInterval(intervalTimeout);
        }
        iterationNumber++;
    }, 10, simpleUtils.hrtimeToMillis(process.hrtime()));
})();

