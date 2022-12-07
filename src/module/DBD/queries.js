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
    let sql = `SELECT * FROM ${table} where nombre like '%${value}%'`
    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            console.log(rows.length)
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.length < 1) reject(new Error("There are no rows in DBD."));
            else (resolve(rows));
        })
    })
}


async function selectFieldByName(table, field, name){
    let sql = `SELECT ${field} FROM ${table} where nombre like '${name}'`
    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.length < 1) reject(new Error("There are no rows in DBD."));
            else (resolve(rows[0]));
        })
    })
}

async function selectFieldByProductID(table, field, productID){
    let sql = `SELECT ${field} FROM ${table} where codigoProducto = '${productID}'`
    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.length < 1) reject(new Error("There are no rows in DBD with this productID"));
            else (resolve(rows[0]));
        })
    })
}


async function deleteProductBYID(table, productID){
    let sql = `DELETE from ${table} where codigoProducto = ${productID}`
    return new Promise((resolve,reject) =>{
        pool.query(sql, (err, rows) =>{
            if(err) reject(new Error("Rows are undefined"));
            else if(rows.affectedRows < 1) reject(new Error("The provided id doesn't exist"));
            else (resolve(rows));
        })
    })
}

async function updateByName(table, name, values){
    let datetime = new Date();
    let sql = `UPDATE ${table} SET
                                nombre = COALESCE(?, nombre),
                                cantidadEnStock = COALESCE(?,cantidadEnStock),
                                categoria = COALESCE(?, categoria),
                                dimensiones = COALESCE(?, dimensiones),
                                descripcion = COALESCE(?, descripcion),
                                precioBase = COALESCE(?, precioBase),
                                precioVenta = COALESCE(?, precioVenta),
                                imagen = COALESCE(?, imagen),
                                peso = COALESCE(?, peso),
                                ultimaVezEditado = COALESCE(?, ultimaVezEditado)
                                WHERE nombre like '${name}';`;
    let listSql = [values.newFurnitureName || null, values.quantity || null, values.category || null, values.dimensions || null,
         values.description || null, values.basePrice || null, values.salePrice || null, values.furnitureImage || null, values.weight || null, datetime];
    return new Promise((resolve,reject) =>{
        pool.query(sql,listSql, (err, rows) =>{
            if(err) reject(new Error(err));
            else if(rows.affectedRows < 1) reject(new Error("There is no match for this name"));
            else (resolve("Updated"));
        })
    })
}

module.exports.selectAllFromDBD = selectAllFromDBD;
module.exports.selectAllFromDBDByString = selectAllFromDBDByString;
module.exports.updateByName = updateByName;
module.exports.selectFieldByName = selectFieldByName;
module.exports.deleteProductBYID = deleteProductBYID;
module.exports.selectFieldByProductID = selectFieldByProductID;