const {fileToImage} = require('../file_to_image/file_to_image');
const {insertIntoDBD} = require('./save_furniture_to_DBD');
const {checkHealthOfPool} = require('../DBD/checkConnection')

async function saveFurnitureToDBD(req,res){
    const file = req.files.furnitureImage;
    const values = req.body;

    if(!checkHealthOfPool()) return res.json("Ha habido un problema.")

    let fileNewName = fileToImage(file);
    if(!await insertIntoDBD(values, fileNewName)) return res.json("Ha habido un problema.")
    res.json("Guardado en la base de datos");
}

module.exports.saveFurnitureToDBD = saveFurnitureToDBD;