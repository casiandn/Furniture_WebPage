const pool = require('../mysqlConnection/database').pool;


async function selectAllFromDBD(table){
    let sql = `SELECT * FROM ${table}`

    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.length < 1) reject("There are no rows in DBD.");
            else (resolve(rows));
        })
    })
}

async function selectAllFromDBDByString(table, value){
    let sql = `SELECT * FROM ${table} where nombre like '${value}' `
    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            console.log(rows.length)
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.length < 1) reject(new Error("There are no rows in DBD."));
            else (resolve(rows));
        })
    })
}

module.exports.selectAllFromDBD = selectAllFromDBD;
module.exports.selectAllFromDBDByString = selectAllFromDBDByString;
