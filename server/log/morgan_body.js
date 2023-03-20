
/*-------- logger module "morgan-body"  https://www.npmjs.com/package/morgan-body -------------------------------------------------------------------------------------*/

// console log only. it turns on when the PROJECT.LOG_LEVEL is 'silly'
const app = require(PROJECT.ROOT + '/app.js').app;
const morgan_body = require('morgan-body');
const loggerStream = {
    write: message => {
        if(PROJECT.LOG_LEVEL_NUM === 6) console.log(message);
    },
};
morgan_body(app, {
    includeNewLine: false,
    stream: loggerStream
});
module.exports = morgan_body;
