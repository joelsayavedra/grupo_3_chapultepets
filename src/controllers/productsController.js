const fs = require('fs');
const path = require('path');
const { v4: getID } = require("uuid");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    edit: function (req, res) {
        let id = req.params.id;
        let producto = products.find(function (objeto) {
            return objeto.id == id;
        });

        res.render('products/productEdit', {
            producto: producto,
            id: id
        });

        // res.send(producto);
    },
    create: function (req, res) {
        res.render('products/productCreate');
    },
    cart: function (req, res) {
        res.render('products/productCart');
    },
    detail: function (req, res) {
        res.render('products/productDetail');
    },
    store: function (req, res) {
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

        if (req.file) {
            producto.image = req.file.filename;
        } else {
            producto.image = "default.png";
        }

        products.push(producto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        res.redirect("/");
    },
    update: function (req, res) {
        //Obtención del id del producto, extraído de la url
        let id = req.params.id;

        //Obtención del producto de la base de datos, en forma de objeto
        let editedProduct = products.find(function (objeto) {
            return objeto.id == id;
        });

        //Sobreescritura de valores de los campos en el objeto recién creado
        editedProduct.name = req.body.name;
        editedProduct.price = req.body.price;
        editedProduct.category = req.body.category;
        editedProduct.brand = req.body.brand;
        editedProduct.description = req.body.description;
        if (req.file) {
            editedProduct.image = req.file.filename;
        };

        //obtención del índice del producto en el array de products.json
        let productIndex = products.findIndex(object => object.id == id);

        //Edición del array products
        if (productIndex != -1) {
            products.splice(productIndex, 1, editedProduct);
        };

        //Escritura del array modificado en el archivo products.json
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2 /*Para guardar en formato más legible*/));

        res.redirect("/products");
    },
    product: function (req, res) {
        res.render('products/inventory', {
            products: products
        });
    },
    productid: function (req, res) {
        let indice = -1;
        for (let i = 0; i < products.length; i++) {
            if (req.params.id == products[i].id) {
                indice = i;
            }
        }
        if (indice >= 0) {
            res.send(products[indice]);
        }
        else {
            res.send("El producto no está en inventario");
        }
    },
    erase: function (req, res) {
        var nuevoProducts = products.filter(function (iden) {
            return iden.id != req.params.id;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(nuevoProducts, null, 2));
        res.render("products/back");
    }
};

module.exports = controller;