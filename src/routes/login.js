const express= require ('express');
const router = express.Router();
const indexController= require ('../controllers/indexController.js');

//Ruta raíz de los productos

router.get('/login', indexController.login);

module.exports= router;