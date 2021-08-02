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
        res.render('users/login');
    },
    register: function (req, res) {
        res.render('users/register');
    },
    profile: function (req, res) {
        res.render('users/profile', {
            user: req.session.userLogged,
        });
    },
    logout: function (req, res) {
        req.session.destroy();
        return res.redirect("/");
    },
    userLoginProcess: function (req, res) {
        //res.send(req.body);
        let userToLogin = User.findByField("nombreUsuario", req.body.nombreUsuario);
        if (userToLogin) {
            if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
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

        let usuario = {
            id: getID(),
            userName: req.body.nombreUsuario,
            currentName: req.body.nombrePila,
            lastname: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            celNumber: req.body.telefono,
            picture: "default.png"
        };

        if (req.file) {
            usuario.picture = req.file.avatarPicture;
        };

        users.push(usuario);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.send("¡Hay un nuevo entrenador pokemon!");

    }
};

module.exports = controller;