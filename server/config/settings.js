
/*-------- global project variables --------------------------------------------------------------*/

global.PROJECT = {}
global.ERROR_LIB = {};
global.FUNCTIONS = {}

/*-------- main folders --------------------------------------------------------------------------*/

PROJECT.ROOT = __dirname + '\/..';
PROJECT.PUBLIC = PROJECT.ROOT + '/public/';
PROJECT.UPLOADS = PROJECT.ROOT + '/public/uploads/';
PROJECT.CSS = PROJECT.ROOT + '/public/css/';
PROJECT.JS = PROJECT.ROOT + '/public/js/';
PROJECT.IMG = PROJECT.ROOT + '/public/images/';
PROJECT.FONTS = PROJECT.ROOT + '/public/fonts/';

/*-------- log configs ---------------------------------------------------------------------------*/

/**
 * available levels:
 *  error   - 0
 *  warn    - 1
 *  info    - 2
 *  http    - 3
 *  verbose - 4
 *  debug   - 5
 *  silly   - 6
 *  @type {string}
 */
PROJECT.LOG_LEVEL = 'debug';
PROJECT.LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
}
PROJECT.LOG_LEVEL_NUM = PROJECT.LOG_LEVELS[PROJECT.LOG_LEVEL];

/*-------- error configs -------------------------------------------------------------------------*/

require(PROJECT.ROOT + '/errors/error_lib');
require(PROJECT.ROOT + '/errors/error_handlers');

/*-------- global functions ----------------------------------------------------------------------*/

require(PROJECT.ROOT + '/functions/global__func.js')
