
//-------- authentication --------------------------------------------------------------------------------------------------------------*/

// send a request to the database
exports.sendRequest = async (req) => {
    try{
        const model = require(PROJECT.ROOT + '/models/user__mod.js');
        const query = await model.getDbQuery(req);
        const connector = require(PROJECT.ROOT + '/database/connector');
        return await connector.single_request(query);
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in getCredentialsFromDB()!`, e.message);
        }
        throw e;
    }
}

// save a token to the database
exports.saveTokenToDB = async (refreshToken) => {
    try{
        const req = {
            method: 'PUT',
            body: {refreshToken: refreshToken},
        }
        const jwt = require('jsonwebtoken');
        jwt.verify(refreshToken, PROJECT.SECRET, (err, decoded) => {
            if (err) throw err
            else req.decoded = decoded;
        });
        return await this.sendRequest(req);
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in saveTokenToDB()!`, e.message);
        }
        throw e;
    }
}

// get credentials from the database
exports.getCredentialsFromDB = async (req) => {
    try{
        let modifiedReq = {...req, method: 'GET'};
        let result = await this.sendRequest(modifiedReq);
        return result.response[0];
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in getCredentialsFromDB()!`, e.message);
        }
        throw e;
    }
}
