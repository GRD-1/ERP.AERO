
// the function returns a query to the database
exports.getDbQuery = async function (req){
    try{
        const queryPrams = require("../functions/db_query_params__func.js");
        const data = await queryPrams.data(req);
        switch (req.method) {
            case 'GET':
                if(req.path === '/file/list') {
                    const {list_size = 10, page = 1} = req.query;
                    return `SELECT * FROM ${PROJECT.DB_NAME}.files limit ${list_size} offset ${(page - 1) * list_size}`;
                }
                return `SELECT * FROM ${PROJECT.DB_NAME}.files WHERE id = '${req.params.id}'`;
            case 'POST':
                return `INSERT INTO ${PROJECT.DB_NAME}.files ${data.headers} VALUES ${data.values}`;
            case 'PUT':
                return `UPDATE ${PROJECT.DB_NAME}.files SET ${data} WHERE id = '${req.params.id}'`;
            case 'DELETE':
                return `DELETE from ${PROJECT.DB_NAME}.files WHERE id = '${req.params.id}'`;
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query text!`, e.message);
        }
        throw e;
    }
}
