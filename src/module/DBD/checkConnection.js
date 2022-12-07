const pool = require('../mysqlConnection/database').pool;

async function checkHealthOfPool(){
    return new Promise((resolve,reject) =>{
        pool.getConnection((err,connection)=> {
            if(err) reject(new Error("Conexion con la base de datos fallida"));
            else{
                connection.release();
                resolve("Working connection")
            }
        });
    })
}

module.exports.checkHealthOfPool = checkHealthOfPool;