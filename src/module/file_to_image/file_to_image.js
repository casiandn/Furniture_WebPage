function fileToImage(file){
    // If no image submitted, exit
    if (!file) return res.sendStatus(400);
    // If does not have image mime type prevent from uploading
    if (/^file/.test(file.mimetype)) return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    var file_name = new Date().getTime() +'_'+file.name;
    file.mv(__dirname + '../../../../upload/' + file_name, (err) =>{
        if(err) return res.sendStatus(400);
    });
    return file_name;
}

module.exports.fileToImage = fileToImage;