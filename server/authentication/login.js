
//-------- authentication ----------------------------------------f-------------------------------------------------------------*/

const dbRequest = require(PROJECT.ROOT + '/authentication/db_request.js');
const tokenHandler = require(PROJECT.ROOT + '/authentication/token.js');

// login user
exports.login = async (req, res) => {
    try{
        let {login, password} = req.body;
        const credentialsFromDB = await dbRequest.getCredentialsFromDB(req);
        if (login && password) {
            const bcrypt = require("bcrypt");
            if (credentialsFromDB && credentialsFromDB.password === bcrypt.hashSync(password, credentialsFromDB.salt)) {
                let tokens = tokenHandler.getNewTokens(credentialsFromDB);
                await dbRequest.saveTokenToDB(credentialsFromDB, tokens.refreshToken);
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
        let {email, login, password} = req.body;
        const credentialsFromDB = await dbRequest.searchForCredentials(login, email);
        if (credentialsFromDB?.login === login) {
            return res.json({message: 'This login is already occupied'})
        }
        if (credentialsFromDB?.email === email) {
            return res.json({message: 'This email is already occupied'})
        }
        let tokens = tokenHandler.getNewTokens(req.body);
        let hashes = await getPasswordHash(password);
        let request = {
            method: 'POST',
            body: {login, email, ...hashes, refreshToken: tokens.refreshToken}
        };
        let savedToDB = await dbRequest.sendRequest(request);
        return res.json({id: savedToDB.response.rows[0].id, login: savedToDB.response.rows[0].login, ...tokens})
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
        // let {email, login, password} = req.body;
        // const credentialsFromDB = await dbRequest.searchForCredentials(login, email);
        // if (credentialsFromDB?.login === login) {
        //     return res.json({message: 'This login is already occupied'})
        // }
        // if (credentialsFromDB?.email === email) {
        //     return res.json({message: 'This email is already occupied'})
        // }
        // let tokens = tokenHandler.getNewTokens(req.body);
        // let hashes = await getPasswordHash(password);
        // let request = {
        //     method: 'POST',
        //     body: {login, email, ...hashes, refreshToken: tokens.refreshToken}
        // };
        // let savedToDB = await dbRequest.sendRequest(request);
        // return res.json({id: savedToDB.response.rows[0].id, login: savedToDB.response.rows[0].login, ...tokens})
        res.json({message: 'you logged out your account'})
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