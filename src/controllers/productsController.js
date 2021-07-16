const controller = {
    edit: function(req,res){
        res.render('productEdit');
    },
    create: function(req,res){
        res.render('productCreate');
    },
    cart: function(req,res){
        res.render('productCart');  
    },
    detail: function(req,res){
        res.render('productDetail');
    }
};

module.exports = controller;