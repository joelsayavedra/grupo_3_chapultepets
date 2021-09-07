const session = require('express-session');
// const fs = require('fs');
// const path = require('path');

const db = require('../database/models/index.js');

// const productsFilePath = path.join(__dirname, '../database/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: async function(req,res){
        let productos = await db.Product.findAll({
            include: {association: "categories"}
        });

        res.render('index',{
            products:productos,
        });
    },
    prueba: async function(req,res){

        let productos = await db.Product.findAll({
            include: {
                // association: "reviews",
                association: "categories",
            }
        });
        let categorias = await db.Category.findAll({
            include: {association: "products"}
        });

        res.send({
            productos,
            categorias,
        });
    },
};

module.exports = controller;