
/*-------- routs ----------------------------------------------------------------------------------------------------------------*/

const express = require("express");
const main__rout = express.Router();
const auth = require(PROJECT.ROOT + '/middleware/authentication/login');
const tokenHandler = require(PROJECT.ROOT + '/middleware/authentication/token');
const upload = require(PROJECT.ROOT + '/middleware/multer');

main__rout.post("/signin", auth.login);
main__rout.post("/signin/new_token", tokenHandler.verifyToken, tokenHandler.updateTokens);
main__rout.get("/info", tokenHandler.verifyToken, auth.getCurrentUserId);
main__rout.post("/signup", auth.register);
main__rout.get("/logout", tokenHandler.verifyToken, auth.logout);

const files__ctr = require('../controllers/files__ctr');
main__rout.post("/file/upload", tokenHandler.verifyToken, upload.single('fileName'), files__ctr.post);
main__rout.get("/file/list", tokenHandler.verifyToken, files__ctr.list);
main__rout.delete("/file/delete/:id", tokenHandler.verifyToken, files__ctr.delete);
main__rout.get("/file/:id", tokenHandler.verifyToken, files__ctr.get);
main__rout.get("/file/download/:id", tokenHandler.verifyToken, files__ctr.download);
main__rout.put("/file/download/:id", tokenHandler.verifyToken, files__ctr.update);

module.exports = main__rout;
