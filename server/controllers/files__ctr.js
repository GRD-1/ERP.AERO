
//-------- file actions controller ----------------------------------------------------------------------------------------------*/

// file upload
exports.post = async function f(req, res) {
    try{
        let {filename, mimetype, size} = req.file;
        req.body = {filename, mimetype, size, extension: req.file.filename.split('.')[1]};
        const model = require(PROJECT.ROOT + '/models/files__mod.js');
        const query = await model.getDbQuery(req);
        const connector = require(PROJECT.ROOT + '/database/connector');
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

// get the file list
exports.list = async function f(req, res) {
    try{
        const model = require(PROJECT.ROOT + '/models/list__mod.js');
        const query = await model.getDbQuery(req);
        const connector = require(PROJECT.ROOT + '/database/connector');
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

// delete the specific file
exports.delete = async function f(req, res) {
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



