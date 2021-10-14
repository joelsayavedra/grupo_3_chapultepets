var express = require('express');
var router = express.Router();

const productsController = require("../../controllers/apis/productsController.js");

/* GET home page. */
router.get('/', productsController.products);
router.get('/categories', productsController.categories);
router.get('/invoices', productsController.invoices);
router.get('/:id', productsController.productDetail);

module.exports = router;