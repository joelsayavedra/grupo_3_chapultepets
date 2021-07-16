const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    edit: function(req,res){
        res.render('productEdit');
    },
    create: function(req,res){
        res.render('productCreate');
    },
    cart: function(req,res){
        res.render('productCart');  
    },
    detail: function(req,res){
        res.render('productDetail');
    }
};

module.exports = controller;