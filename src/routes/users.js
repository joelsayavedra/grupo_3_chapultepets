const express = require ('express');
const router = express.Router();
const usersController= require ('../controllers/usersController.js');

// const path = require('path');
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../../public/img/products"));
//     },
//     filename: function (req, file, cb) {
//         const newFileName = "prod_" + Date.now() + path.extname(file.originalname);
//         cb(null, newFileName);
//     }
// });

// const upload = multer({ storage });

//Ruta raíz de usuarios

router.get('/register', usersController.register);
router.get('/login', usersController.login);

router.post("/register",usersController.userRegister);
router.post("/login",usersController.userLogin);

module.exports= router;