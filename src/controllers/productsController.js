const fs = require('fs');
const path = require('path');
const {v4:getID}= require("uuid");

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
    },
    store: function(req,res){
        let producto = {
            id: getID(),
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            rating: 0,
            reviewsAmount: 0,
            price: Number(req.body.price),
            brand: req.body.brand,
        }

        if(req.file){
            producto.image=req.file.filename;
        }else{
            producto.image= "default.png";
        }

        products.push(producto);
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, 2));

        res.redirect("/");
    }
};

module.exports = controller;