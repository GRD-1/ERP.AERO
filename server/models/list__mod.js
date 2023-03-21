
//-------- file list data model -------------------------------------------------------------------------------------------*/

// the function returns a query to the database
exports.getDbQuery = async function (req){
    try{
        switch (req.method) {
            case 'GET':
                const {list_size = 10, page = 1} = req.query;
                return `SELECT * FROM erp_aero.files limit ${list_size} offset ${(page - 1) * list_size}`;
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query text!`, e.message);
        }
        throw e;
    }
}
