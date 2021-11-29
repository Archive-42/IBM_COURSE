
// require Winston
const winston = require('winston');

/**
 * appSettings
 */
const appSettings = {
    winston: {
        sillyLogConfig: {
            level: 'silly',
            transports: [
                new winston.transports.File({
                    filename: './logs/silly.log'
                }),
                new winston.transports.Console()
            ]
        },
    },
    log4js: {
        traceLogConfig: {
            appenders: {
                fileAppender: { type: 'file', filename: './logs/trace.log'},
                consoleAppender: { type: 'console' }
            },
            categories: {
                default: { appenders: ['fileAppender', 'consoleAppender'], level: 'trace'}
            }
        }
    }
};

module.exports = appSettings;
