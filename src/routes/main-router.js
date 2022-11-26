const {Router} = require("express")
const router = Router();

router.get('/', (req,res) =>{
    res.render('index');
})

router.get('/panel', (req, res) =>{
    res.render('panel')
})

module.exports = router;