const {fileToImage, checkIfValidImage, deleteFile} = require('../file_management/file_managment');
const {updateByNameFurniture} = require('./update_furniture_to_DBD')
const {selectFieldByName} = require('../DBD/queries')

async function updateFurniture(req,res){
    let inputs = req.body;
    let file = req.files || null;
    let oldImage;
    if(file){
        file = req.files.furnitureImage
        // comprobar y guardar nueva imagen
        if(!checkIfValidImage(file)) return res.status(500).json("Ha habido un problema con tu fichero. Extensiones: jpg, jpeg, png");
        file = await fileToImage(file).catch(e => {console.log(e); return false});
        if(!file) return res.status(500).json("No se ha podido completar la operacion. (fichero)");
        // borar imagen antigua despues de comprobar que se haya actualizado la DBD, aqui solo nos quedmaos con la antigua
        oldImage = await selectFieldByName('producto', 'imagen', inputs.furnitureName).catch(e =>{console.log(e); return false})
        if(!oldImage) return res.status(500).json("No se ha podido completar la operacion. Fichero antiguo no encontrado");
    }
    inputs.furnitureImage = file;
    let response = await updateByNameFurniture(inputs.furnitureName,inputs)
    if(!response){
        if(file) deleteFile(fileNewName)
        return res.status(500).json("No se ha podido actualizar el producto en la base datos.");
    }

    if(oldImage) deleteFile(oldImage.imagen);

    res.json("Actualizado");
}

module.exports.updateFurniture = updateFurniture;
