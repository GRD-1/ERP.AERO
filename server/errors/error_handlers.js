
//-------- error handler -------------------------------------------------------------------------------------------------*/

// error emitter
const Emitter = require("events");
const logger = require(PROJECT.ROOT + '/middleware/log/winston.js');
ERROR_LIB.emitter = new Emitter();

// errors
ERROR_LIB.emitter.on('Error', async function(e){
    logger.error('', e);
});

// uncaught errors
process.on('uncaughtException', (e) => {
    try{
        e.cause = e.message;
        e.message = `UNCAUGHT ERROR!!!`;
        e.code = 1000;
        logger.error('', e);
        process.exit(1);
        setTimeout(() => {
            process.abort();
        }, 1000).unref()
    }
    catch (e) {
        logger.error('', e);
    }
});
