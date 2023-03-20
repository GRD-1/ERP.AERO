
//-------- login data model --------------------------------------------------------------------------------------------------*/

// the function returns a query to the database
exports.getDbQuery = async function (req){
    try{
        const queryPrams = require("../functions/db_query_params__func.js");
        const data = await queryPrams.data(req);
        switch (req.method) {
            case 'GET':
                if(req.decoded?.id) return `SELECT * FROM erp_aero.users WHERE id = '${req.decoded.id}'`;
                else if(req.decoded?.login) return `SELECT * FROM erp_aero.users WHERE login = '${req.decoded.login}'`;
                return `SELECT * FROM erp_aero.users WHERE login = '${req.body.login}'`;
            case 'POST':
                return `INSERT INTO erp_aero.users ${data.headers} VALUES ${data.values}`;
            case 'PUT':
                return `UPDATE erp_aero.users SET ${data} WHERE id = '${req.decoded.id}'`;
            case 'DELETE':
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query text!`, e.message);
        }
        throw e;
    }
}
