
//-------- file actions controller ----------------------------------------------------------------------------------------------*/

// file upload
exports.upload = async function f(req, res) {
    try{
        const fs = require('fs');
        console.log('\nfile__ctr()');
        console.log(req.body);
        res.send('The file was delivered to the server!');
        let file_path = req.path;
        // let file_content = tab_form_data.file_content;
        // let file_data;
        //
        // if(file_content){
        //     file_data = file_content.replace(/^data:.+?;base64,/, "");
        //     return new Promise((resolve, reject) => {
        //         fs.writeFile( _public + file_path, file_data, 'base64', function (error) {
        //             if(error){
        //                 reject(error);
        //             }
        //             else {
        //                 resolve({message: 'файл "' + tab_form_data.file_name + '" загружен на сервер'});
        //             }
        //         });
        //     })
        // }
        // else {
        //     new Error('получен пустой файл');
        // }
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



