
//-------- template page controller ----------------------------------------------------------------------------------------------*/

exports.get = async function f(req, res) {
    try{
        console.log("\ntemplate__ctr()");
        const dbData = await test_db_connection();
        res.json({msg: 'Hello ERP AERO!', data: dbData});
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in template__ctr!`, e.message);
        }
        ERROR_LIB.emitter.emit('Error', e);
        res.status(500).send('#500. Internal server error!');
    }
}

async function test_db_connection() {
    try {
        console.log("\ntest_db_connection()")
        const connector = require('../database/connector');
        return await connector.single_request(`INSERT INTO erp_aero.users(login, email, password) VALUES('Ravol', 'ravol@mail.ru', 'passsss')`)
        // return await connector.single_request(`SELECT * FROM data.users`);
    }
    catch (e) {
        if(!(e.name in ERROR_LIB)) {
            e = new ERROR_LIB.SRV_ERROR(`Error in test_db_connection()!`, e.message);
        }
        throw e;
    }
}
