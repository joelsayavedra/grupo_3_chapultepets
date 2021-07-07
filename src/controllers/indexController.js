const controller = {
    index: function(req,res){
        res.render('index');
    },
    login: function(req,res){
        res.render('login');
    },
    productCart: function(req,res){
        res.render('productCart');  
    },
    productDetail: function(req,res){
        res.render('productDetail');
    },
    register: function(req,res){
        res.render('register');
    },
};

module.exports = controller;