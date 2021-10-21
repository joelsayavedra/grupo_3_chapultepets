// const { query } = require("express");
// const { sequelize } = require("../../database/models/index.js");
const db = require("../../database/models/index.js")

const controller = {
    products: function(req,res){

        let promesaCategoria = db.Category.findAll({
            include: {
                association: "products",
            },
        });

        let promesaProductos = db.Product.findAll({
            include: [
                {association:"categories"},
                {association:"reviews"}
            ]
        });

        Promise.all([promesaCategoria, promesaProductos])
        .then(function([categoriesData,data]){

            let productosSinCategoria = 0;

            let page = parseFloat(req.query.page);    
            let articlesPerPage = 10;
            let pagesNumber = Math.ceil(data.length/articlesPerPage);
            let countByCategory = {};

            for (let i = 0; i < data.length; i++) {
                //Se sobreescriben los valores de rating y reviewsAmount, de acuerdo a la base de datos
                let ratingSum=0;
                for (let j = 0; j < data[i].reviews.length; j++) {
                    ratingSum+= data[i].reviews[j].rating;
                }
                if(data[i].reviews.length!=0){
                    data[i].rating=ratingSum/data[i].reviews.length;
                }else{
                    data[i].rating=0;
                }
                data[i].reviewsAmount=data[i].reviews.length;

                data[i]={
                    ...data[i].dataValues,
                    detail:"/api/products/"+data[i].id,
                    // num:i+1,
                };
            }

            //Agrega al objeto countByCategory la categoría y la cantidad de productos por cada una
            for (let i = 0; i < categoriesData.length; i++) {
                countByCategory={
                    ...countByCategory,
                    [categoriesData[i].name]: categoriesData[i].products.length 
                }
            }
            //Si no hay categoría en un producto, lo toma en cuenta para mostrar la cantidad de productos sin categoría al final del objeto countByCategory
            for (let i = 0; i < data.length; i++) {
                if(data[i].categories.length==0){
                    productosSinCategoria+=1;
                }
            }

            countByCategory={
                ...countByCategory,
                "WithoutCategory": productosSinCategoria
            }

            if(Number.isInteger(page) && page<=pagesNumber){

                let paginatedData = [];

                for (let i = 0; i < articlesPerPage; i++) {
                    if(i+(articlesPerPage*(page-1))<data.length){
                        paginatedData=[
                            ...paginatedData,
                            data[i+(articlesPerPage*(page-1))]
                        ]
                    }
                }

                if(page==1){
                    return res.json({
                        count: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        next:"/api/products/?page="+(parseFloat(req.query.page)+1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else if(page==pagesNumber){
                    return res.json({
                        count: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        previous:"/api/products/?page="+(parseFloat(req.query.page)-1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else{
                    return res.json({
                        count: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        previous:"/api/products/?page="+(parseFloat(req.query.page)-1),
                        next:"/api/products/?page="+(parseFloat(req.query.page)+1),
                        url: "api/products",
                        products: paginatedData
                    });
                }
            }else if(!req.query.page){
                return res.json({
                    count: data.length,
                    countByCategory: countByCategory,
                    url: "api/products",
                    products: data
                });
            }else{
                return res.json({
                    meta: {
                        detail: "Not found",
                    },
                });
            }            
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
    categories: function(req,res){
        db.Category.findAll({
            include: {association:"products"}
        })
        .then(function(data){
            return res.json({
                    meta: {
                        status: "200",
                        total: data.length,
                        url: "api/categories",
                    },
                    data: data
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
    categoriesId: function(req,res){
        db.Category.findByPk(req.params.id,{
            include: {
                association:"products",
                include: {association: "reviews"}
            }
        })
        .then(function(data){
            return res.json({
                    meta: {
                        status: "200",
                        total: data.length,
                        url: "api/categories",
                    },
                    data: data
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
    prueba: function(req,res){

        let cantidadProductos = 25;
        let productosConCategoria = 0;
        
        db.Category.findAll({
            include: {
                association: "products",
            },
        })
        .then(function(categoriesData){
            let countByCategory = {};
            for (let i = 0; i < categoriesData.length; i++) {
                productosConCategoria+=categoriesData[i].products.length;
                countByCategory={
                    ...countByCategory,
                    [categoriesData[i].name]: categoriesData[i].products.length 
                }
            }
            countByCategory={
                ...countByCategory,
                "WithoutCategory": cantidadProductos-productosConCategoria
            }

            return res.json({
                countByCategory: countByCategory
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
    invoices: function(req,res){
        db.Invoice.findAll({
        })
        .then(function(data){
            return res.json({
                    meta: {
                        status: "200",
                        total: data.length,
                        url: "api/invoices",
                    },
                    data: data
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
    productDetail: function(req,res){
        db.Product.findByPk(req.params.id,{
            include:[
                {association:"categories"},
                {
                    association:"reviews",
                    include: {association:"user"}
                }
            ]
        })
        .then(function(data){

            
            let ratingSum=0;
            for (let j = 0; j < data.reviews.length; j++) {
                ratingSum+= data.reviews[j].rating;
            }
            if(data.reviews.length!=0){
                data.rating=ratingSum/data.reviews.length;
            }else{
                data.rating=0;
            }
            data.reviewsAmount=data.reviews.length;

            data={
                urlImage: "/img/products/"+data.image,
                ...data.dataValues,
                detail:"/api/products/"+data.id,
                // num:i+1,
            };

            return res.json({
                    meta: {
                        status: "200",
                        url: "/api/product/"+req.params.id,
                    },
                    data: data
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
    list: function(req,res){
        if(req.query.selector=="marcas"){
            db.Product.findAll({
            })
            .then(data=>{

                marcas=[];

                for (let i = 0; i < data.length; i++) {
                    if(marcas.findIndex(element=>{
                        return element==data[i].brand;
                    })<0){
                        marcas.push(data[i].brand)
                    }                  
                }

                marcas=marcas.sort((a,b)=>{
                    let x = a.toLowerCase();
                    let y = b.toLowerCase();
                    if(x<y){return -1}
                    else if(x>y){return 1}
                    else{return 0}
                });

                return res.json({
                    meta: {
                        status: "200",
                        url: "/api/lists?selector="+req.query.selector,
                    },
                    data: marcas
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
        }else if(req.query.selector=="categorias") {
            db.Category.findAll({
                include: {association: "products"},
                order:[["name","ASC"]]
            })
            .then(data=>{

                let datos = [];
                for (let i = 0; i < data.length; i++) {
                    datos.push({
                        id: data[i].id,
                        name: data[i].name,
                        productsAmount: data[i].products.length,
                    });
                }

                return res.json({
                    meta: {
                        status: "200",
                        url: "/api/lists?selector="+req.query.selector,
                    },
                    data: datos
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
        }else if(req.query.selector=="mascotas") {
            //roedores reptiles aves peces perro gato
            db.Category.count()
            .then(data=>{
                return res.json({
                    meta: {
                        status: "200",
                        url: "/api/lists?selector="+req.query.selector,
                    },
                    data: data
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
        }else{
            return res.json({
                meta: {
                    status: "200",
                    url: "/api/lists?selector="+req.query.selector,
                },
                detail: "error"
            });
        }
    },
};

module.exports=controller;