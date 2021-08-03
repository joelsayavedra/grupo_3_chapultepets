const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { v4: getID } = require("uuid");
const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: function (req, res) {
        // console.log(req.cookies.testing);
        res.render('users/login');
    },
    register: function (req, res) {
        // res.cookie("testing", "Put that cookie down!",{maxAge: 1000*300});
        res.render('users/register');
    },
    profile: function (req, res) {
        res.render('users/profile', {
        });
    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userName");
        return res.redirect("/");
    },
    userLoginProcess: function (req, res) {
        // res.send(req.body);

        let userToLogin = User.findByField("nombreUsuario", req.body.nombreUsuario);
        if (userToLogin) {
            if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.recordar) {
                    res.cookie("userName", req.body.nombreUsuario, {maxAge: 1000*60*30});
                }
                
                res.redirect("/users/profile");

            } else {
                res.render('users/login', {
                    errors: {
                        password: {
                            msg: "¡Contraseña incorrecta!"
                        }
                    }
                });
            };
        } else {
            res.render('users/login', {
                errors: {
                    nombreUsuario: {
                        msg: "¡Usuario no encontrado!"
                    }
                }
            });
        };
    },

    userRegister: function (req, res) {
        const passwordcrypt = bcryptjs.hashSync(req.body.password, 12);
        let usuario = {
            id: getID(),
            nombreUsuario: req.body.nombreUsuario,
            nombrePila: req.body.nombrePila,
            apellido: req.body.apellido,
            email: req.body.email,
            password: passwordcrypt,
            telefono: req.body.telefono,
        };
        if (req.file) {
            usuario.imagenPerfil = req.file.filename;
        } else {
            usuario.imagenPerfil = "default.png";
        };

        users.push(usuario);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.send("¡Hay un nuevo entrenador pokemon!");

    }
};

module.exports = controller;