
//-------- file actions controller ----------------------------------------------------------------------------------------------*/

const model = require(PROJECT.ROOT + '/models/files__mod.js');
const connector = require(PROJECT.ROOT + '/database/connector');

// file upload
exports.post = async function f(req, res) {
    try{
        let {filename, mimetype, size} = req.file;
        req.body = {filename, mimetype, size, extension: req.file.filename.split('.')[1]};
        const query = await model.getDbQuery(req);
        let result = await connector.single_request(query);
        res.send({id: result.response.insertId, ...req.body});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// get a list of file
exports.list = async function f(req, res) {
    try{
        const query = await model.getDbQuery(req);
        let result = await connector.single_request(query);
        res.send(result.response);
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// delete a specific file
exports.delete = async function f(req, res) {
    try{
        req.method = 'GET';
        let query = await model.getDbQuery(req);
        let result = await connector.single_request(query);
        if(result?.response[0]?.filename){
            const fs = require('fs');
            fs.unlinkSync(PROJECT.UPLOADS + result.response[0].filename)
            req.method = 'DELETE';
            query = await model.getDbQuery(req);
            await connector.single_request(query);
            res.json({success: true, message: `the file id = ${req.params.id} was deleted`});
        } else {
            res.json({success: false, message: `the file id = ${req.params.id} was not found`});
        }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// get the specific file information
exports.get = async function f(req, res) {
    try{
        res.json({id: req.decoded?.id});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// download the file
exports.download = async function f(req, res) {
    try{
        res.json({id: req.decoded?.id});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

// update the file
exports.update = async function f(req, res) {
    try{
        res.json({id: req.decoded?.id});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in file__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}



