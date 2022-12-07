const {checkHealthOfPool} = require('../DBD/checkConnection')
const {selectAllFromDBD, selectAllFromDBDByString } = require('../DBD/queries')

async function queryDatabase(){
    if(!await checkHealthOfPool().catch(e => {console.log(e); return false})) return false;
    return await selectAllFromDBD('producto').catch(e => {return false});
}

async function queryDatabaseWithParam(name){
    if(!await checkHealthOfPool().catch(e => {console.log(e); return false})) return false;
    
    return await selectAllFromDBDByString('producto', name).catch(e => {return false});
}

module.exports.queryDatabase = queryDatabase

module.exports.queryDatabaseWithParam = queryDatabaseWithParam
