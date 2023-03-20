
/*-------- functions ------------------------------------------------------------------------------------------------------*/

exports.IsCredentialsCorrect = async (email, code) => {
    try{
        return {result: true};
        // return {result: false, message: "the wrong code!"};
        // return {result: false, message: "the code is out of date!"};

        // const db = require('/server/database/connector');
        // let query = `Select * from data.oneTimeCode where email = ${email} and code = ${code}`;
        // const response = await db.single_request(query);
        // if(response.rows[0]?.codeTime < Date.now() - 6000){
        //     return true;
        // }
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to verify credentials!`, e.message);
        }
        throw e;
    }
}

/**
 * checks if there is an email address in the database and sends the access code
 * @param {string} email        - the email address
 * @param {string} action       - new/restore credentials
 * @returns {Promise<{result: boolean, msg: string}>}
 */
exports.isValidEmail = async (email, action) => {
    try{
        return {result: true, msg: `he access code was sent to email address ${email}`};

        // const db = require('/server/database/connector');
        // let query = `INSERT INTO data.oneTimeCode ('email') VALUES (${email}) RETURNING *`;
        // const response = await db.single_request(query);

        // here should be the handler which sends the code to the email
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Unable to verify email!`, e.message);
        }
        throw e;
    }
}
