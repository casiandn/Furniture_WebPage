const {queryDatabase, queryDatabaseWithParam} = require('./queryGetDBD')

async function getFurniture(req,res){
    let name = req.params.name;
    let data;

    if(name) data = await queryDatabaseWithParam(name)
    else data = await queryDatabase()
    
    if(!data) return res.status(500).json("No se han podido mostrar los productos. Puede que no exista este producto.");
    res.json(data);
}

module.exports.getFurniture = getFurniture;