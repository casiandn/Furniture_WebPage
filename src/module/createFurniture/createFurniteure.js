const {fileToImage} = require('../file_to_image/file_to_image');
const {insertIntoDBD} = require('./save_furniture_to_DBD');
async function saveFurnitureToDBD(req,res){
    const file = req.files.furnitureImage;
    const values = req.body;
    let fileNewName = fileToImage(file);
    insertIntoDBD(values, fileNewName);
    res.json("Succes");
}

module.exports.saveFurnitureToDBD = saveFurnitureToDBD;