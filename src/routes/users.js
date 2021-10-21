const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/users"));
    },
    filename: function(req, file, cb) {
        const newFileName = "users_" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

let validacionRegistro = [
    check('nombreUsuario')
        .notEmpty().withMessage('Escribe un nombre de usuario para este sitio.').bail()
        .isLength({ min: 4 }).withMessage('Debe tener al menos 4 caracteres.'),
    check('nombrePila')
        .notEmpty().withMessage('Escribe tu nombre').bail()
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres.'),
    check('apellido')
        .notEmpty().withMessage('Escribe tu apellido').bail()
        .isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres.'),
    check('email')
        .notEmpty().withMessage('Escribe una dirección de correo electrónico.').bail()
        .isEmail().withMessage('Debe ser una dirección de correo válida.'),
    check('password')
        .notEmpty().withMessage('Escribe una constraseña.').bail()
        .isStrongPassword().withMessage('La contraseña debe contener al menos 8 caracteres. Al menos una mayúscula, una mínuscula, un símbolo y un número.'),
    check('confirmacionPassword')
        .notEmpty().withMessage('Confirma la contraseña.').bail()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    check('telefono')
        .isLength({ min: 9 }).withMessage('Debe contener al menos 10 caracteres numéricos.').bail()
        .isInt().withMessage('Solo se aceptan caracteres numéricos.'),
    check("avatarPicture").custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=[".jpg",".jpeg",".png",".gif"];

        if (file){
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`*Formato inválido. Extensiones permitidas: ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    })
];

//Ruta raíz de usuarios

router.get('/register', guestMiddleware, usersController.register);
router.get('/login', guestMiddleware, usersController.login);

router.post("/register", upload.single("avatarPicture"), validacionRegistro, usersController.userRegister);
router.post("/login", upload.single("avatarPicture"), usersController.userLoginProcess);

router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', authMiddleware, usersController.logout);

router.put('/profile/edit', usersController.edit);
router.delete('/profile/edit', usersController.destroy);

module.exports = router;