const express= require ('express');
const router = express.Router();
const productController= require ('../controllers/productControllers.js');

//Ruta raíz de los productos

router.get('/', productController.productCreat);

module.exports= router;