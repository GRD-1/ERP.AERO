
/*-------- middleware file loader -----------------------------------------------------------------------------------------*/

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PROJECT.PUBLIC + '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
    }
})
module.exports = multer({ storage: storage })
