const User = require("../models/User");

const controller = {
    login: function(req,res){
        res.render('users/login');
    },
    register: function(req,res){
        res.render('users/register');
    },
    userLogin: function(req,res){
        res.send('¡Hola!');
    }
};

module.exports = controller;