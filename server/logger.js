import winston from 'winston';
import config from './config';
require('winston-loggly');

winston.emitErrs = true;

export default logger = new winston.Logger({
    transports: [
        new winston.transports.Loggly(config.winston),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
