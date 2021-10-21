// const fs = require('fs');
// const path = require('path');

const { v4: getID } = require("uuid");
const { validationResult } = require("express-validator");
const db = require('../database/models/index.js');
const fetch = require("node-fetch");

// const productsFilePath = path.join(__dirname, '../database/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    edit: function(req, res) {
        db.Product.findByPk(req.params.id)
            .then(producto => {
                // return res.send(producto);
                res.render('products/productEdit', {
                    producto: producto,
                    id: producto.id
                });
            })
            .catch(error => {
                return res.send("Error!: " + error);
            });
        // let id = req.params.id;
        // let producto = products.find(function (objeto) {
        //     return objeto.id == id;
        // });

        // res.render('products/productEdit', {
        //     producto: producto,
        //     id: id
        // });
    },
    create: function(req, res) {
        res.render('products/productCreate');
    },
    cart: function(req, res) {
        res.render('products/productCart', {
            user: req.session.userLogged,
        });
    },
    store: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            // let categories = req.body.category.split(",");
            // for (let i = 0; i < categories.length; i++) {
            //     categories[i] = categories[i].trim();
            // }

            let producto = {
                id: getID(),
                name: req.body.name,
                description: req.body.description,
                rating: 0,
                reviewsAmount: 0,
                price: Number(req.body.price),
                brand: req.body.brand,
            };

            if (req.file) {
                producto.image = req.file.filename;
            } else {
                producto.image = "default.png";
            };

            // return res.send({...producto});

            db.Product.create({
                    ...producto,
                })
                .then(resultado => {
                    res.redirect("/");
                })
                .catch(err => {
                    res.send("error!: " + err)
                })
                // products.push(producto);
                // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        } else {
            res.render('products/productCreate', {
                errors: errors.mapped(),
                old: req.body,
            });
            // res.send(errors);
        }
    },
    update: function(req, res) {
        let errors = validationResult(req);

        db.Product.findByPk(req.params.id)
            .then(producto => {
                if (errors.isEmpty()) {
                    //Obtención del producto de la base de datos, en forma de objeto
                    let editedProduct = producto;

                    //Sobreescritura de valores de los campos en el objeto recién creado
                    editedProduct.name = req.body.name;
                    editedProduct.price = req.body.price;
                    // editedProduct.category = categories;
                    editedProduct.brand = req.body.brand;
                    editedProduct.description = req.body.description;
                    if (req.file) {
                        editedProduct.image = req.file.filename;
                    };

                    db.Product.update({
                        name: editedProduct.name,
                        price: editedProduct.price,
                        brand: editedProduct.brand,
                        description: editedProduct.description,
                        image: editedProduct.image,
                    }, {
                        where: { id: req.params.id }
                    })

                    res.redirect("/");
                } else {
                    res.render('products/productEdit', {
                        producto: producto,
                        // id: req.params.id,
                        errors: errors.mapped(),
                        old: req.body,
                    });
                }
            })
            .catch(error => {
                return res.send("Error: " + error);
            });
    },
    product: function(req, res) {
        db.Product.findAll()
            .then(productos => {
                res.render('products/inventory', {
                    products: productos
                });
            })
            .catch(error => {
                res.send("Error!: " + error);
            });
    },
    detail: function (req, res) {

        fetch("https://chapultepets.herokuapp.com/api/products/"+req.params.id)
        .then(response=>response.json())
        .then(producto=>{
            // return res.send(producto.data);
            res.render('products/productDetail',{
                product: producto.data
            });
        })
        .catch(error => {
        res.send("Error!: " + error);
        });
    },
    erase: function(req, res) {
        db.Product.destroy({
                where: { id: req.params.id },
            })
            .then(flag => {
                res.render("products/back");
            })
            .catch(error => {
                return res.send("Error: " + error);
            });
    },
    list: function (req,res) {
        if(req.query.selector){
            fetch("https://chapultepets.herokuapp.com/api/products/lists?selector="+req.query.selector)
            .then(response=>response.json())
            .then(data=>{
                let abecedario=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
                return res.render('products/list',{
                    abecedario,
                    data,
                });
            })
            .catch(error=>{
                return error;
            });
        }
        else{
            return res.send("error");
        }
    },
    categoriesId: function (req,res) {
        fetch("https://chapultepets.herokuapp.com/api/products/categories/"+req.params.id)
        .then(response=>response.json())
        .then(data=>{

            // return res.send(data.data.products);

            // for (let i = 0; i < data.data.products.length; i++) {
            //     //Se sobreescriben los valores de rating y reviewsAmount, de acuerdo a la base de datos
            //     let ratingSum=0;
            //     for (let j = 0; j < data.data.products[i].reviews.length; j++) {
            //         ratingSum+= data.data.products[i].reviews[j].rating;
            //     }
            //     if(data.data.products[i].reviews.length!=0){
            //         data.data.products[i].rating=ratingSum/data.data.products[i].reviews.length;
            //     }else{
            //         data.data.products[i].rating=0;
            //     }
            //     data[i].reviewsAmount=data[i].reviews.length;

            //     data.data.products[i]={
            //         ...data.data.products[i].dataValues,
            //         detail:"/api/products/"+data.data.products[i].id,
            //         // num:i+1,
            //     };
            // }

            return res.render('products/productList',{
                category: data.data.name,
                products: data.data.products,
            });
        })
        .catch(error=>{
            return error;
        });
    }
};

module.exports = controller;