
//-------- routs ----------------------------------------------------------------------------------------------------------------*/

const express = require("express");
const main__rout = express.Router();
const auth = require(PROJECT.ROOT + '/authentication/login');
const tokenHandler = require(PROJECT.ROOT + '/authentication/token');

main__rout.post("/signin", auth.login);
main__rout.post("/signin/new_token", tokenHandler.updateTokens);
main__rout.get("/info", tokenHandler.verifyToken, auth.getCurrentUserId);
main__rout.post("/signup", auth.register);
main__rout.get("/logout", auth.logout);

const file__ctr = require('../controllers/file__ctr');
main__rout.post("/file/upload", tokenHandler.verifyToken, file__ctr.upload);
main__rout.get("/file/list", tokenHandler.verifyToken, file__ctr.list);
main__rout.delete("/file/delete/:id", tokenHandler.verifyToken, file__ctr.delete);
main__rout.get("/file/:id", tokenHandler.verifyToken, file__ctr.get);
main__rout.get("/file/download/:id", tokenHandler.verifyToken, file__ctr.download);
main__rout.put("/file/download/:id", tokenHandler.verifyToken, file__ctr.update);

module.exports = main__rout;
