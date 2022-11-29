const {checkHealthOfPool} = require('../DBD/checkConnection')
const {selectAllFromDBD, selectAllFromDBDByString } = require('../DBD/queries')

async function queryDatabase(name){
    if(!checkHealthOfPool()) return res.json("Ha habido un problema.")
    
    if(!name) return await selectAllFromDBD('producto').catch(e => console.log(e));
    else return await selectAllFromDBDByString('producto', name)
}


module.exports.queryDatabase = queryDatabase