const path = require("path");
const fs = require("fs")

function fileToImage(file){
    // Move the uploaded image to our upload folder
    return new Promise((resolve,reject) =>{
        var file_name = new Date().getTime() +'_'+file.name;
        file.mv(__dirname + '../../../../upload/' + file_name, (err) =>{
            if(err) reject(err)
            else resolve(file_name)
        });
    })
}

function checkIfValidImage(file){
        // If no image submitted, exit
        if (!file) return false
        // If does not have image mime type prevent from uploading
        if (/^file/.test(file.mimetype)) return false;
        // check jpeg jpg or png
        let extension = path.extname(file.name)
        if(extension != '.jpeg' && extension != '.png' && extension != '.jpg') return false;
        return true;
}

function deleteFile(file){
    fs.unlink(__dirname + '../../../../upload/' + file, (err) => {
        if(err) throw err;
    })
    return true;
}
module.exports.checkIfValidImage = checkIfValidImage;
module.exports.fileToImage = fileToImage;
module.exports.deleteFile = deleteFile;
