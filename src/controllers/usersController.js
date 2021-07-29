const User = require("../models/User");

const controller = {
    login: function(req,res){
        res.render('users/login');
    },
    register: function(req,res){
        res.render('users/register');
    },
    userLogin: function(req,res){
        res.send('¡Ingresaste con éxito!');
    },
    userRegister: function(req,res){
        res.send('¡Hay un nuevo integrante!');
    }
};

module.exports = controller;