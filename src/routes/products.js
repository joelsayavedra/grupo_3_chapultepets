const express= require ('express');
const router = express.Router();
const productsController= require ('../controllers/productsController.js');

//Ruta raíz de productos

router.get('/edit', productsController.edit);
router.get('/create', productsController.create);
router.get('/cart', productsController.cart);
router.get('/detail', productsController.detail);

module.exports= router;