const session = require('express-session');
const fs = require('fs');
const path = require('path');

const db = require('../database/models/index.js');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: function(req,res){
        res.render('index',{
            products:products,
        });
    },
    prueba: async function(req,res){

        // db.Product.findAll()
        // .then(datos=>{
        //     res.send(datos);
        // })
        // .catch(err=>{
        //     res.send("error!: "+err);
        // })

        let productos = await db.Product.findAll({
            include: {association: "categories"}
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