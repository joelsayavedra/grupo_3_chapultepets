const db = require("../../database/models/index.js")

const controller = {
    products: function(req,res){
        db.Product.findAll({
            include: {association:"categories"}
        })
        .then(function(data){

            let page = parseFloat(req.query.page);    
            let articlesPerPage = 10;
            let pagesNumber = Math.ceil(data.length/articlesPerPage);   
            
            for (let i = 0; i < data.length; i++) {
                data[i]={
                    ...data[i].dataValues,
                    detail:"/api/products/"+data[i].id,
                    // num:i+1,
                };
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
                        total: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        next:"/api/people/?page="+(parseFloat(req.query.page)+1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else if(page==pagesNumber){
                    return res.json({
                        total: data.length,
                        resultsPerPage: articlesPerPage,
                        page:req.query.page,
                        previous:"/api/people/?page="+(parseFloat(req.query.page)-1),
                        url: "api/products",
                        products: paginatedData
                    });
                }else{
                    return res.json({
                        total: data.length,
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
                    total: data.length,
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