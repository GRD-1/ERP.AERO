
//-------- login data model --------------------------------------------------------------------------------------------------*/

// the function returns a query to the database
exports.getDbQuery = async function (req){
    try{
        const queryPrams = require("../functions/db_query_params__func.js");
        const data = await queryPrams.data(req);
        switch (req.method) {
            case 'GET':
                if(req.decoded?.id) return `SELECT * FROM ${PROJECT.DB_NAME}.users WHERE id = '${req.decoded.id}'`;
                return `SELECT * FROM ${PROJECT.DB_NAME}.users WHERE id = '${req.body.id}'`;
            case 'POST':
                return `INSERT INTO ${PROJECT.DB_NAME}.users ${data.headers} VALUES ${data.values}`;
            case 'PUT':
                return `UPDATE ${PROJECT.DB_NAME}.users SET ${data} WHERE id = '${req.decoded.id}'`;
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query text!`, e.message);
        }
        throw e;
    }
}
