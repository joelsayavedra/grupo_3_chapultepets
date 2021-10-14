const db = require("../../database/models/index.js")

const controller = {
    products: function(req,res){

        let promesaCategoria = db.Category.findAll({
            include: {
                association: "products",
            },
        });

        let promesaProductos = db.Product.findAll({
            include: {association:"categories"}
        });

        Promise.all([promesaCategoria, promesaProductos])
        .then(function([categoriesData,data]){

            let cantidadProductos = data.length;
            let productosSinCategoria = 0;

            let page = parseFloat(req.query.page);    
            let articlesPerPage = 10;
            let pagesNumber = Math.ceil(data.length/articlesPerPage);
            let countByCategory = {};
            
            for (let i = 0; i < data.length; i++) {
                data[i]={
                    ...data[i].dataValues,
                    detail:"/api/products/"+data[i].id,
                    // num:i+1,
                };
            }

            for (let i = 0; i < categoriesData.length; i++) {
                countByCategory={
                    ...countByCategory,
                    [categoriesData[i].name]: categoriesData[i].products.length 
                }
            }

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
                        next:"/api/people/?page="+(parseFloat(req.query.page)+1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else if(page==pagesNumber){
                    return res.json({
                        count: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        previous:"/api/people/?page="+(parseFloat(req.query.page)-1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else{
                    return res.json({
                        count: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        previous:"/api/people/?page="+(parseFloat(req.query.page)-1),
                        next:"/api/people/?page="+(parseFloat(req.query.page)+1),
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
                {association:"reviews"}
            ]
        })
        .then(function(data){

            
            data={
                urlImage: "/img/products/"+data.image,
                ...data.dataValues,
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
};

module.exports=controller;