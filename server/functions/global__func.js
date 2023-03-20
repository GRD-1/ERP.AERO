
/*-------- global functions (available via global.CUECARDS.FUNC) ----------------------------------------------------------*/

/**
 * returns data type
 * @param {*} data
 * @returns {string}
 */
FUNCTIONS.dataType = (data) => Object.prototype.toString.call(data).match(/\w+/g)[1].toLowerCase();

/**
 * converts the CamelCase value to snake_case
 * @param {string} value
 * @returns {string}
 */
FUNCTIONS.toSnakeCase = (value) => {
    try {
        return value.replace(/[A-Z]/g, "_$&").toLowerCase();
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the function [toSnakeCase]!`, e.message);
        }
        throw e;
    }
}

/**
 * converts the snake_case value to CamelCase
 * @param {string} value
 * @returns {string}
 */
FUNCTIONS.toCamelCase = (value) => {
    try {
        let arr = value.split('_');
        return arr.reduce((result, str, index) => {
            result += (index > 0) ? str[0].toUpperCase() + str.substr(1) : str;
            return result;
        }, '')
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the function [toCamelCase]!`, e.message);
        }
        throw e;
    }
}

/**
 * converts an object keys from snake_case style to camelCase style
 * @param {object} obj
 * @returns {object}
 */
FUNCTIONS.dbResponseToCamelCase = (obj) => {
    try {
        return Object.entries(obj).reduce((result, item) => {
                    let camelKey = FUNCTIONS.toCamelCase(item[0]);
                    result[camelKey] = item[1];
                    return result
                }, {});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the function [dbResponseToCamelCase]!`, e.message);
        }
        throw e;
    }
}
