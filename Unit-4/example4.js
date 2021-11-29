
'use strict'
// Use JavaScript destructuring assignemnt (new in ES6!) to get the processFileXyz function
const { processFile } = require('./file-processor');
// or
// const processFile = require('./rhw').processFile;
const logger = require('./simple-logger');
logger.setLogLevel(logger.Level.DEBUG);
//***********************************************************
//*                         MAIN LINE                       *
//***********************************************************
// Location of the data directory
const DATA_DIR = '../data';
// The file name to be processed
const FILE_NAME = "1mWords.txt";
// mainline JS function - runs first before the event loop gets involved - invoke as IIFE
(function mainline() {
    // Capture start time
    const startTime = process.hrtime();
    // Output a message. Main flow of executing starting...
    logger.info('mainline(): Start... ***', startTime);
    // File to be processed
    let fileName = DATA_DIR + '/' + FILE_NAME;
    logger.debug('mainline(): Processing file: ' + fileName + '...');
    // Let's roll!
    processFile(fileName, (err, derivedKeyAsString) => {
        if (err) {
            logger.error('Something has gone horribly wrong: ' + err.message);
        }
        // The results are in!
        logger.info('(callback)(): Derived key as string: \'' + derivedKeyAsString + '\'', startTime);
    });    
    // And, we're done
    logger.info('mainline(): End. ***', startTime);
})();
