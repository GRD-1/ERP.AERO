
//-------- file actions controller ----------------------------------------------------------------------------------------------*/

const model = require(PROJECT.ROOT + '/models/files__mod.js');
const connector = require(PROJECT.ROOT + '/database/connector');
const fs = require('fs');

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
        if(req.params?.id){
            let query = await model.getDbQuery(req);
            let result = await connector.single_request(query);
            if(result?.response[0]?.filename){
                fs.unlinkSync(PROJECT.UPLOADS + result.response[0].filename)
                req.method = 'DELETE';
                query = await model.getDbQuery(req);
                await connector.single_request(query);
                res.json({success: true, message: `the file id = ${req.params.id} was deleted`});
            } else {
                res.json({success: false, message: `the file id = ${req.params.id} was not found`});
            }
        } else {
            res.json({success: false, message: `unable to get file id!`});
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
        if(req.params?.id){
            const query = await model.getDbQuery(req);
            let result = await connector.single_request(query);
            res.send(result.response[0]);
        } else {
            res.json({success: false, message: `unable to get file id!`});
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

// download the file
exports.download = async function f(req, res) {
    try{
        if(req.params?.id){
            const query = await model.getDbQuery(req);
            let result = await connector.single_request(query);
            if(result?.response[0]?.filename){
                const path = require('path');
                res.sendFile(path.resolve(`public/uploads/${result.response[0].filename}`));
            } else {
                res.json({success: false, message: `the file id = ${req.params.id} was not found`});
            }
        } else {
            res.json({success: false, message: `unable to get file id!`});
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

// replace the specific file with a new one with the same id in database
exports.put = async function f(req, res) {
    try{
        if(req.params?.id){
            req.method = 'GET';
            let query = await model.getDbQuery(req);
            let result = await connector.single_request(query);
            if(result?.response[0]?.filename){
                fs.unlinkSync(PROJECT.UPLOADS + result.response[0].filename)
                req.method = 'PUT';
                let {filename, mimetype, size} = req.file;
                req.body = {filename, mimetype, size, extension: req.file.filename.split('.')[1]};
                query = await model.getDbQuery(req);
                await connector.single_request(query);
                res.json({success: true, message: `the file id = ${req.params.id} was updated successfully`});
            } else {
                res.json({success: false, message: `the file id = ${req.params.id} was not found`});
            }
        } else {
            res.json({success: false, message: `unable to get file id!`});
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
