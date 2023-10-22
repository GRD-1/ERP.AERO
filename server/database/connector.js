
//-------- db connection module -------------------------------------------------------------------------------------------//

const logger = require(PROJECT.ROOT + '/middleware/log/winston.js');

// get database connection parameters
const getCredentials = async function () {
    return  {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
    }
}

// Use this method when you need to send only one request
exports.single_request = async function (query) {
    try {
        if(PROJECT.LOG_LEVEL_NUM > 4) logger.verbose(query);
        const mysql = require("mysql2");
        const credentials = await getCredentials();
        const connection = mysql.createConnection(credentials).promise();
        let response = await connection.query(query);
        await connection.end();
        return {response: response[0]};
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.EXT_API_CONNECT_ERROR("Invalid database request!", e.message)
        }
        throw e;
    }
}
