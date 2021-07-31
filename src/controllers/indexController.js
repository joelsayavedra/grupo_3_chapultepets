const session = require('express-session');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: function(req,res){
        res.render('index',{
            products:products,
            user: req.session.userLogged,
        });
    },
};

module.exports = controller;