const {queryDeleteProduct} = require('./deleteFurniture_DBD')
const {deleteFile} = require('../file_management/file_managment');
const {selectFieldByProductID} = require('../DBD/queries')

async function deleteFurniture(req,res){
    let productID = req.params.productID;

    let furnitureImage = await selectFieldByProductID('producto', 'imagen', productID).catch(e => {console.log(e); return false;})
    if(!furnitureImage) return res.status(500).json("No se ha encontrado el producto en la base de datos.");

    let response = await queryDeleteProduct(productID)
    if(!response) return res.status(500).json("No se ha podido borrar el producto.");
    else deleteFile(furnitureImage.imagen)

    res.status(200).json("Producto borrado.");
}

module.exports.deleteFurniture = deleteFurniture;
