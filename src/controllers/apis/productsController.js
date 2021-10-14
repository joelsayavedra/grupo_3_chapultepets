const db = require("../../database/models/index.js")

const controller = {
    products: function(req,res){
        db.Product.findAll({
        })
        .then(function(productos){
            return res.json({
                    meta: {
                        status: "200",
                        total: productos.length,
                        url: "api/products",
                    },
                    data: productos
                });
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    },
    products: function(req,res){
        db.Category.findAll({
        })
        .then(function(productos){
            return res.json({
                    meta: {
                        status: "200",
                        total: productos.length,
                        url: "api/categories",
                    },
                    data: productos
                });
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    },
};

module.exports=controller;