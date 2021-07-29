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
    },
    userRegister: function(req,res){
        User.create(req.body);
        res.send('¡Hay un nuevo integrante!');
    }
};

module.exports = controller;