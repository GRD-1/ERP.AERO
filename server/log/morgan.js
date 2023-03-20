
/*-------- logger module "morgan"   https://www.npmjs.com/package/morgan --------------------------------------------------*/

const morgan = require('morgan');
const logger = require(PROJECT.ROOT + '/log/winston.js');

const getMorganMiddleware = () => {
    try {
        return morgan(
            function (tokens, req, res) {
                const status = Number.parseFloat(tokens.status(req, res))
                return JSON.stringify({
                    method: tokens.method(req, res),
                    url: tokens.url(req, res),
                    status: status,
                    content_length: tokens.res(req, res, 'content-length'),
                    response_time: Number.parseFloat(tokens['response-time'](req, res)),
                    reqBody: (PROJECT.LOG_LEVEL_NUM > 4 || status !== 200) ? req.body : undefined,
                    userId: 'userId'
                });
            },
            {
                stream: {
                    write: (message) => {
                        const data = JSON.parse(message);
                        const msg = `${data.method}  ${data.url}  ${data.status}  ${data.response_time} ms`;
                        switch (data.status) {
                            case 500:
                                logger.warn(msg, data);
                                break;
                            case 404:
                            case 403:
                                logger.info(msg, data);
                                break;
                            default:
                                logger.http(msg, data);
                                break;
                        }
                        if([4,5].includes(PROJECT.LOG_LEVEL_NUM) && data.reqBody) {
                            console.log('request body: ', data.reqBody);
                        }
                    },
                },
            }
        );
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in Morgan!`, e.message);
        }
        throw e;
    }
}
module.exports = getMorganMiddleware();
