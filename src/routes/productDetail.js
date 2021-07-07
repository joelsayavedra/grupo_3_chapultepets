const express= require ('express');
const router = express.Router();
const indexController= require ('../controllers/indexController.js');

//Ruta raíz de los productos

router.get('/productDetail', indexController.productDetail);

module.exports= router;