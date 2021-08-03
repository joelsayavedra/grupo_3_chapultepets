const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/users"));
    },
    filename: function (req, file, cb) {
        const newFileName = "users_" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

//Ruta raíz de usuarios

router.get('/register', guestMiddleware, usersController.register);
router.get('/login', guestMiddleware, usersController.login);

router.post("/register", upload.single("avatarPicture"), usersController.userRegister);
router.post("/login", upload.single("avatarPicture"),usersController.userLoginProcess);

router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;