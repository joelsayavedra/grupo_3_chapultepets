const controller = {
    productEdit: function(req,res){
        res.render('productEdit');
    },
    productCreat: function(req,res){
        res.render('productCreate');
    },
};

module.exports = controller;