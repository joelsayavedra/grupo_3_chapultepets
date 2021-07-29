const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const {check} = require("express-validator");

const validacionesCreacionProducto= [
    check("name")
        .notEmpty().withMessage("Debes colocar un nombre"),
    check("category")
        .notEmpty().withMessage("Debes colocar una categoría"),
    check("brand")
        .notEmpty().withMessage("Debes colocar la marca"),
    check("price")
        .notEmpty().withMessage("Debes colocar un precio"),
    check("description")
        .notEmpty().withMessage("Debes colocar una descripción"),
    check("avatar").custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=[".jpg",".png",".gif"];

        if (!file){
            throw new Error("Debes agregar una imagen de producto!");
        } else{
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`La extensiones permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }
        
        return true;
    })
];

const validacionesEdicionProducto= [
    check("name")
        .notEmpty().withMessage("Debes colocar un nombre"),
    check("category")
        .notEmpty().withMessage("Debes colocar una categoría"),
    check("brand")
        .notEmpty().withMessage("Debes colocar la marca"),
    check("price")
        .notEmpty().withMessage("Debes colocar un precio"),
    check("description")
        .notEmpty().withMessage("Debes colocar una descripción")
];

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
router.put("/edit/:id", upload.single("avatar"), validacionesEdicionProducto, productsController.update);
//  Creación de productos
router.get('/create', productsController.create);
router.post('/create', upload.single("avatar"), validacionesCreacionProducto,productsController.store);
//  Carrito de compras
router.get('/cart', productsController.cart);
//  Detalle del producto
router.get('/detail', productsController.detail);
// Listado de productos
router.get('/', productsController.product);
router.get('/:id', productsController.productid);
router.delete('/:id', productsController.erase);

module.exports = router;