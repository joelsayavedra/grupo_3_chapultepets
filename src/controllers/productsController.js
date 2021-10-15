// const fs = require('fs');
// const path = require('path');

const { v4: getID } = require("uuid");
const { validationResult } = require("express-validator");
const db = require('../database/models/index.js');

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
        let indice = -1;

        db.Product.findByPk(req.params.id,{
            include:[
                {
                    association:"categories"
                },
                {
                    association:"reviews",
                    include: {association:"user"}
                },
            ]
        })
        .then(producto=>{
            // return res.send(producto);
            res.render('products/productDetail',{
                product: producto
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
};

module.exports = controller;