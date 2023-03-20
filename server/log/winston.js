
/*-------- logger module "winston"   https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/ --*/

const winston = require('winston');
const { combine, timestamp, printf, colorize, json, metadata } = winston.format;

const errorFilter = winston.format((info) => {
    return info.level === 'error' ? info : false;
});
const ExceptErrorsFilter = winston.format((info) => {
    return info.level !== 'error' ? info : false;
});
const infoFilter = winston.format((info) => {
    return (info.level !== 'verbose' && info.level !== 'debug' && info.level !== 'silly') ? info : false;
});

// ...
const logger = () => {
    try{
        return winston.createLogger({
            level: PROJECT.LOG_LEVEL || 'info',
            transports: [
                new winston.transports.Console({
                    format: combine(
                        ExceptErrorsFilter(),
                        colorize({ all: true }),
                        timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                        }),
                        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
                    ),
                }),
                new winston.transports.Console({
                    format: combine(
                        errorFilter(),
                        colorize({ all: true }),
                        timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                        }),
                        printf((info) => {
                            return `[${info.timestamp}] ${info.level}: ${info.message}\n  cause: ${info.cause}\n  ${info.stack}\n`
                        })
                    ),
                }),
            ],
        });
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in Winston!`, e.message);
        }
        throw e;
    }
}
module.exports = logger();
