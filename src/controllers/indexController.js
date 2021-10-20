const session = require('express-session');
const fetch = require("node-fetch");
// import fetch from "node-fetch";

// const fs = require('fs');
// const path = require('path');

const db = require('../database/models/index.js');

// const productsFilePath = path.join(__dirname, '../database/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: async function(req,res){
        // let productos = await db.Product.findAll({
        //     include: {association: "categories"},
        // });

        if(req.query.page){
            fetch("https://chapultepets.herokuapp.com/api/products?page="+req.query.page)
            .then(response=>response.json())
            .then(productos=>{
                // return res.send(productos.products);
                return res.render('index',{
                    products:productos.products,
                });
            })
            .catch(error=>{
                return error;
            });
        }else{
            fetch("https://chapultepets.herokuapp.com/api/products?page=1")
            .then(response=>response.json())
            .then(productos=>{
                // return res.send(productos.products);
                return res.render('index',{
                    products:productos.products,
                });
            })
            .catch(error=>{
                return error;
            });
        }
    },
    prueba: async function(req,res){

        let productos = await db.Product.findAll({
            include: [
                {association: "reviews",},
                {association: "categories",}
            ],
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