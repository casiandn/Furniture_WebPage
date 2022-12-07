const {Router} = require("express")
const router = Router();
const { body } = require('express-validator');
const {saveFurnitureToDBD} = require('../module/createFurniture/createFurniteure')
const {getFurniture} = require('../module/getFurniture/getFurniture')
const {updateFurniture} = require('../module/updateFurniture/updateFurniture')
const {deleteFurniture} = require('../module/deleteFurniture/deleteFurniture')


router.get('/', (req,res) =>{
    res.render('index');
})

router.get('/panel', (req, res) =>{
    res.render('panel')
})

router.get('/getProducts', getFurniture);

router.get('/getProducts/:name', getFurniture);

router.post(
    '/createFurniture',
    body('furnitureName').trim().escape(),
    body('quantity').isDecimal(),
    body('dimensions').trim().escape(),
    body('description').trim().escape(),
    body('basePrice').isDecimal().trim().escape(),
    body('salePrice').isDecimal().trim().escape(),
    body('category').trim().escape(),
    saveFurnitureToDBD
)

router.put('/getProducts/:name', updateFurniture);

router.delete('/getProducts/:productID', deleteFurniture);


module.exports = router;
