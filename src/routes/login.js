const express= required ('express');
const router = express.Router();
const productController=('./controller/productControllers');

//Ruta raíz de los productos

router.get('/login', productController.login);

module.exports= router;