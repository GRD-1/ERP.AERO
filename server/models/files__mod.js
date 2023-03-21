
//-------- files data model --------------------------------------------------------------------------------------------------*/

// the function returns a query to the database
exports.getDbQuery = async function (req){
    try{
        const queryPrams = require("../functions/db_query_params__func.js");
        const data = await queryPrams.data(req);
        switch (req.method) {
            case 'GET':
                if(req.path === '/file/list') {
                    const {list_size = 10, page = 1} = req.query;
                    return `SELECT * FROM erp_aero.files limit ${list_size} offset ${(page - 1) * list_size}`;
                }
                return `SELECT * FROM erp_aero.files WHERE id = '${req.params.id}'`;
            case 'POST':
                return `INSERT INTO erp_aero.files ${data.headers} VALUES ${data.values}`;
            case 'PUT':
                return `UPDATE erp_aero.files SET ${data} WHERE id = '???'`;
            case 'DELETE':
                return `DELETE from erp_aero.files WHERE id = '${req.params.id}'`;
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query text!`, e.message);
        }
        throw e;
    }
}
