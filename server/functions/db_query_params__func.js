
//-------- database query parameters -------------------------------------------------------------------------------------------------*/

// returns query conditions (everything after [WHERE])
exports.conditions = async function (req) {
    try{
        // if(req.body.id) return `where id = '${req.body.id}'`;
        // else if(req.body.login) return `where login = '${req.body.login}'`;
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query conditions!`, e.message);
        }
        throw e;
    }
};

// returns data for the "INSERT" and "UPDATE" queries
exports.data = async function (req) {
    try {
        if(!req.body){return ''}
        let amper = '', headers = '(', values = '(', shielded_value, data = '';
        switch (req.method) {
            case 'POST':
                for(let key in req.body){
                    if(key === 'id') continue;
                    headers += `${amper} ${FUNCTIONS.toSnakeCase(key)}`;
                    shielded_value = await shield_characters(req.body[key])
                    values += `${amper} '${shielded_value}'`;
                    amper = ',';
                }
                headers += ')';
                values += ')';
                return {headers: headers, values: values};
            case 'PUT':
                for(let key in req.body){
                    if(key === 'id') continue;
                    shielded_value = await shield_characters(req.body[key])
                    data += `${amper} ${FUNCTIONS.toSnakeCase(key)} = '${shielded_value}'`;
                    amper = ',';
                }
                return data;
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to get the query conditions!`, e.message);
        }
        throw e;
    }
};

// shields special characters that can cause errors in SQL
async function shield_characters(value) {
    try {
        if(typeof(value) === 'string'){
            value = value.replace(/'/g, '$');
            value = value.replace(/"/g, '$$');
        }
        return value;
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the character shield function!`, e.message);
        }
        throw e;
    }
}
