
'use strict'
// The FileSystem module
const fs = require('fs');
// The logger module (event logger)
const logger = require('../common/event-logger');
// Constants
const constants = require('../common/constants');
// Application settings
const appSettings = require('../settings/app-settings').example9;

/**
 * Consolidate event listeners in one place
 */
function registerReadableStreamEventListeners(readableStream) {
    readableStream.on('open', (fd) => {
        logger.info('open event received, file descriptor: ' + fd, 'ReadableStream.on(open).callback');
    });
    readableStream.on('data', (chunk) => {
        logger.info('data event received: chunk size: ' + chunk.length, 'ReadableStream.on(data).callback');
    });
    readableStream.on('error', (err) => {
        logger.info('Something has gone horribly wrong: ' + err.message, 'ReadableStream.on(error).callback');
    });
    readableStream.on('close', () => {
        logger.info('close event received', 'ReadableStream.on(close).callback');
    });
}

/**
 * Consolidate event listeners in one place
 */
function registerWritableStreamEventListeners(writableStream, readableStream) {
    writableStream.on('open', (fd) => {
        logger.info('open event received, file descriptor: ' + fd, 'WritableStream.on(open).callback');
        // Connect the readableStream to the writableStream
        readableStream.pipe(writableStream);
    });
    writableStream.on('pipe', (src) => {
        logger.info('pipe event received, let the data flow!', 'WritableStream.on(pipe).callback');
    });
    writableStream.on('error', (err) => {
        logger.info('Something has gone horribly wrong: ' + err.message, 'WritableStream.on(error).callback');
    });
    writableStream.on('close', () => {
        logger.info('close event received', 'WritableStream.on(close).callback');
    });
}

/**
 * The mainline function - IIFE
 */
(function mainline() {
    // Create the ReadableStream
    const readableStream = fs.createReadStream(appSettings.inputFileName, 'utf8');
    // Register event listeners for the input file
    registerReadableStreamEventListeners(readableStream);
    // The output file (WritableStream)
    const writableStream = fs.createWriteStream(appSettings.outputFileName, 'utf8');
    // Register event listeners for the output file
    registerWritableStreamEventListeners(writableStream, readableStream);
})();
