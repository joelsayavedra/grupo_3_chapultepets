const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const {check} = require("express-validator");

const validacionesCreacionProducto= [
    check("name")
        .notEmpty().withMessage("Debes colocar un nombre").bail()
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("category")
        .notEmpty().withMessage("Debes colocar una categoría"),
    check("brand")
        .notEmpty().withMessage("Debes colocar la marca del producto (o 'genérico' si no tiene)"),
    check("price")
        // .notEmpty().withMessage("Debes colocar un precio").bail()
        .custom((value, {req})=>{
            if(!value){
                throw new Error("Debes colocar un precio");
            }else if(parseFloat(value)<0){
                throw new Error("No nos podemos costear regalar dinero");
            }
            return true;
        }),
    check("description")
        .notEmpty().withMessage("Debes colocar una descripción").bail()
        .isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres"),
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
        .notEmpty().withMessage("Debes colocar un nombre").bail()
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("category")
        .notEmpty().withMessage("Debes colocar una categoría"),
    check("brand")
        .notEmpty().withMessage("Debes colocar la marca del producto (o 'genérico' si no tiene)"),
    check("price")
        .notEmpty().withMessage("Debes colocar un precio").bail()
        .isFloat({min:0}).withMessage("No nos podemos costear poner ese precio"),
    check("description")
        .notEmpty().withMessage("Debes colocar una descripción").bail()
        .isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres"),
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

//  Edición de productos
router.get('/edit/:id', productsController.edit);
router.put("/edit/:id", upload.single("avatar"), validacionesEdicionProducto, productsController.update);
//  Creación de productos
router.get('/create', productsController.create);
router.post('/create', upload.single("avatar"), validacionesCreacionProducto,productsController.store);
//  Carrito de compras
router.get('/cart', productsController.cart);
// Listados de productos
router.get('/', productsController.product);
router.get("/lists",productsController.list)
//  Detalle del producto
router.get('/:id', productsController.detail);
//  Eliminación de producto
router.delete('/:id', productsController.erase);
//Productos por categoría
router.get('/categories/:id', productsController.categoriesId);


module.exports = router;