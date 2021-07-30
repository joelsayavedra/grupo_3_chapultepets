const User = require("../models/User");
const bcryptjs = require('bcryptjs');

const controller = {
    login: function(req,res){
        res.render('users/login');
    },
    register: function(req,res){
        res.render('users/register');
    },
    userLoginProcess: function(req,res){
        //res.send(req.body);
        let userToLogin = User.findByField("nombreUsuario",req.body.nombreUsuario);
        if(userToLogin){
            if (bcryptjs.compareSync(req.body.password,userToLogin.password)) {
                res.send("¡Bienvenido "+userToLogin.nombreUsuario+"!");
            } else {
                res.render('users/login',{
                    errors:{
                        password:{
                            msg: "¡Contraseña incorrecta!"
                        }
                    }
                });
            };
        }else{
            res.render('users/login',{
                errors:{
                    nombreUsuario:{
                        msg: "¡Usuario no encontrado!"
                    }
                }
            });
        };

    },
    userRegister: function(req,res){
        res.send('¡Hay un nuevo integrante!');
    }
};

module.exports = controller;