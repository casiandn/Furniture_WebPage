const {checkHealthOfPool} = require('../DBD/checkConnection')
const {updateByName} = require('../DBD/queries')

async function updateByNameFurniture(name, values){
    if(!await checkHealthOfPool().catch(e => {console.log(e); return false})) return false;
    return await updateByName('producto', name, values).catch(e => {console.log(e); return false});
}

module.exports.updateByNameFurniture = updateByNameFurniture;
