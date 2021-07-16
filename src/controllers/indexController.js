const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: function(req,res){
        res.render('index',{
            products:products,
        });
    },
};

module.exports = controller;