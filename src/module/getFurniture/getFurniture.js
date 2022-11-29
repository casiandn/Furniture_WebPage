const {queryDatabase} = require('./queryGetDBD')

async function getFurniture(req,res){
    let data = await queryDatabase()
    console.log(data)
    if(!data) return res.json("Ha habido un problema");
    res.json(data);
}

module.exports.getFurniture = getFurniture;