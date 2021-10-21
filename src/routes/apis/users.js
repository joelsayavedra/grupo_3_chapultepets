var express = require('express');
var router = express.Router();

const usersController = require("../../controllers/apis/usersController.js");

/* GET home page. */
router.get('/', usersController.users);
router.get('/:id', usersController.userByID);
router.get('/usuario/:userName', usersController.userCheck);
router.get('/email/:email', usersController.emailCheck);

module.exports = router;