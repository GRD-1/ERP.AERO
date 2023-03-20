
//-------- error library ---------------------------------------------------------------------------------------*/

global.ERROR_LIB = {};

/**
 * uncaught error
 * @description                 - custom class for server errors
 * @constructor
 * @param {string} super        - call the built-in "Error" class constructor
 * @param {string} message      - error message
 * @param {string} name         - the class name
 * @param {number} code         - numeric error code
 * @param {string} cause        - the circumstances in which the error occurred (the parent error message)
 * @param {string} stack        - current call stack
 * @return {object}             - error object
*/
ERROR_LIB.UNCAUGHT_ERROR = class UNCAUGHT_ERROR extends Error {
    constructor(message, cause) {
        super(message);
        this.name = this.constructor.name;
        this.code = 1000;
        this.cause = cause;
        this.stack;
        this.userId = 'userId';
    }
}
// server error
ERROR_LIB.SRV_ERROR = class SRV_ERROR extends ERROR_LIB.UNCAUGHT_ERROR {
    constructor(message, cause) {
        message = '[SRV_ERROR] ' + message;
        super(message, cause);
        this.code = 1100;
    }
}
// database error
ERROR_LIB.EXT_API_CONNECT_ERROR = class EXT_API_CONNECT_ERROR extends ERROR_LIB.UNCAUGHT_ERROR {
    constructor(message, cause) {
        message = '[EXT_API_CONNECT_ERROR] ' + message;
        super(message, cause);
        this.code = 1200;
    }
}
