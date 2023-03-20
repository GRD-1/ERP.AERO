
//-------- authentication ----------------------------------------f-------------------------------------------------------------*/

const dbRequest = require(PROJECT.ROOT + '/middleware/authentication/db_request.js');
const tokenHandler = require(PROJECT.ROOT + '/middleware/authentication/token.js');

// login user
exports.login = async (req, res) => {
    try{
        let {id, password} = req.body;
        const credentialsFromDB = await dbRequest.getCredentialsFromDB(req);
        if (id && password) {
            const bcrypt = require("bcrypt");
            if (credentialsFromDB && credentialsFromDB.password === bcrypt.hashSync(password, credentialsFromDB.salt)) {
                let tokens = tokenHandler.getNewTokens(id);
                await dbRequest.saveTokenToDB(tokens.refreshToken);
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    ...tokens
                });
            } else {
                res.status(403).send({
                    success: false,
                    message: 'Incorrect login or password'
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in loginHandler!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// registering a new account
exports.register = async (req, res) => {
    try{
        let {id, password} = req.body;
        const credentialsFromDB = await dbRequest.getCredentialsFromDB(req);
        if (credentialsFromDB?.id === id) {
            return res.json({message: 'This id is already occupied'})
        }
        let tokens = tokenHandler.getNewTokens(id);
        let hashes = await getPasswordHash(password);
        let request = {
            method: 'POST',
            body: {id, ...hashes, refreshToken: tokens.refreshToken}
        };
        let savedToDB = await dbRequest.sendRequest(request);
        return res.json({id: id, ...tokens})
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in a new account register!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// log out of the account
exports.logout = async (req, res) => {
    try{
        let tokens = tokenHandler.getNewTokens(req.decoded.id);
        let request = {
            method: 'PUT',
            decoded: req.decoded,
            body: {refreshToken: 'erased'},
        };
        await dbRequest.sendRequest(request);
        return res.json({success: true, message: "you are logged out", ...tokens})
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the logout procedure!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// returns current user id
exports.getCurrentUserId = async (req, res) => {
    try{
        res.json({id: req.decoded?.id});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in the logout procedure!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// get new password hash
const getPasswordHash = async (password) => {
    try{
        const bcrypt = require("bcrypt");
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        return {salt, password: hashPassword}
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in getHash() function!`, e.message);
        }
        throw e;
    }
}
