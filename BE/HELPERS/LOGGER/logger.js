// const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const {
    errorLogRoute, infoLogRoute, logLevel, errorLogLevel, errorTimeStampFormat,
} = require('../../CONSTANTS/logs');

const {
    combine, timestamp, colorize, printf,
} = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

const devLogger = () => createLogger({
    level: logLevel,
    format: combine(
        colorize(),
        timestamp({ format: errorTimeStampFormat }),
        myFormat,
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: errorLogRoute, level: errorLogLevel }),
        new transports.File({ filename: infoLogRoute }),
        new transports.Console(),
    ],
});

const productionLogger = () => createLogger({
    level: logLevel,
    format: combine(
        timestamp(),
        myFormat,
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
        new transports.Console(),
    ],
});

const stagingLogger = () => createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: errorTimeStampFormat }),
        myFormat,
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: errorLogRoute, level: errorLogLevel }),
        new transports.File({ filename: infoLogRoute }),
        new transports.Console(),
    ],
});

module.exports = { devLogger, productionLogger, stagingLogger };
