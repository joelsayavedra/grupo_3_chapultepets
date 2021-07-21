const express= require ('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const productsController= require ('../controllers/productsController.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"../../public/img/products"));
    },
    filename: function(req, file, cb){
        const newFileName= "prod_"+Date.now()+path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({storage});

//Ruta raíz de productos
    //  Edición de productos
router.get('/edit', productsController.edit);
    //  Creación de productos
router.get('/create', productsController.create);
router.post('/create',upload.single("avatar"), productsController.store);
    //  Carrito de compras
router.get('/cart', productsController.cart);
    //  Detalle del producto
router.get('/detail', productsController.detail);

module.exports= router;