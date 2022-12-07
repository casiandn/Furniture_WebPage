const {deleteProductBYID} = require('../DBD/queries')
const {checkHealthOfPool} = require('../DBD/checkConnection')

async function queryDeleteProduct(productID){
    if(!await checkHealthOfPool().catch(e => {console.log(e); return false})) return false;
    return await deleteProductBYID('producto', productID).catch(e => {console.log(e); return false});
}

module.exports.queryDeleteProduct = queryDeleteProduct;
