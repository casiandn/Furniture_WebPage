const {fileToImage, checkIfValidImage, deleteFile} = require('../file_management/file_managment');
const {insertIntoDBD} = require('./save_furniture_to_DBD');
const {checkHealthOfPool} = require('../DBD/checkConnection')

async function saveFurnitureToDBD(req,res){
    const file = req.files.furnitureImage;
    const values = req.body;

    //comprobar conexion
    if(!await checkHealthOfPool().catch(e => {console.log(e); return false})) return res.status(500).json("Ha habido un problema con la conexion");

    // save file 
    if(!checkIfValidImage(file)) return res.status(500).json("Ha habido un problema con tu fichero. Extensiones: jpg, jpeg, png");
    let fileNewName = await fileToImage(file).catch(e => {console.log(e); return false});
    if(!fileNewName) return res.status(500).json("No se ha podido completar la operacion. (fichero)");

    // insert data into db
    let dataBaseInsert = await insertIntoDBD(values, fileNewName).catch(e => {console.log(e); return false})
    if(!dataBaseInsert){
        deleteFile(fileNewName)
        return res.status(500).json("No se ha podido guardar en la base de datos")
    }

    res.status(200).json("Guardado en la base de datos");
}

module.exports.saveFurnitureToDBD = saveFurnitureToDBD;