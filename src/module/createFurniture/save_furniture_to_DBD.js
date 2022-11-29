const pool = require('../mysqlConnection/database').pool;

async function insertIntoDBD(values, file){
    let noError = true;
    let furnitureName = values.furnitureName;
    let quantity = values.quantity;
    let dimensions = values.dimensions;
    let description = values.description;
    let basePrice = values.basePrice;
    let salePrice = values.salePrice;
    let category = values.category;
    let fileName = file;
    let weight = values.weight;
    let sql = `INSERT INTO PRODUCTO (nombre,cantidadEnStock, categoria, dimensiones, descripcion, precioBase, precioVenta, imagen, peso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    pool.query(sql, 
        [furnitureName, quantity, category, dimensions, description, basePrice, salePrice, fileName, weight],
        (err, rows) =>{
        if (err){
            noError = false;
            throw err;
        }
        console.log("All rows inserted");
    })
    return noError;
}
module.exports.insertIntoDBD = insertIntoDBD;

