const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const productsController = require('../controllers/productsController.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/products"));
    },
    filename: function (req, file, cb) {
        const newFileName = "prod_" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

//Ruta raíz de productos
//  Edición de productos
router.get('/edit/:id', productsController.edit);
router.put("/edit/:id", upload.single("avatar"), productsController.update);
//  Creación de productos
router.get('/create', productsController.create);
router.post('/create', upload.single("avatar"), productsController.store);
//  Carrito de compras
router.get('/cart', productsController.cart);
//  Detalle del producto
router.get('/detail', productsController.detail);
// Listado de productos
router.get('/', productsController.product);
router.get('/:id', productsController.productid);
router.delete('/:id', productsController.productDelete);

module.exports = router;