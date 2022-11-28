const pool = require('../mysqlConnection/database').pool;

async function insertIntoDBD(values, file){
    let furnitureName = values.furnitureName;
    let quantity = values.quantity;
    let dimensions = values.dimensions;
    let description = values.description;
    let basePrice = values.basePrice;
    let salePrice = values.salePrice;
    let category = values.category;
    let fileName = file;
    let sql = `INSERT INTO PRODUCTO (nombre,cantidadEnStock, categoria, dimensiones, descripcion, precioBase, precioVenta, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    pool.query(sql, 
        [furnitureName, quantity, category, dimensions, description, basePrice, salePrice, fileName],
        (err, rows) =>{
        if (err) throw err
        console.log("All rows inserted");
    })
}
module.exports.insertIntoDBD = insertIntoDBD;
