const pool = require('../mysqlConnection/database').pool;

async function checkHealthOfPool(){
    pool.getConnection((err,connection)=> {
        if(err){
            throw err;
        };
        connection.release();
        return true;
    });
}

module.exports.checkHealthOfPool = checkHealthOfPool;