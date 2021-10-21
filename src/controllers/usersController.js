// const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const { v4: getID } = require("uuid");
const { validationResult } = require("express-validator");
const db = require('../database/models');

// const usersFilePath = path.join(__dirname, '../database/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: function(req, res) {
        // console.log(req.cookies.testing);
        res.render('users/login');
    },
    register: function(req, res) {
        // res.cookie("testing", "Put that cookie down!",{maxAge: 1000*300});
        res.render('users/register');
    },
    profile: function(req, res) {
        res.render('users/profile', {});
    },
    logout: function(req, res) {
        req.session.destroy();
        res.clearCookie("userName");
        return res.redirect("/");
    },
    userLoginProcess: function(req, res) {
        // res.send(req.body);

        // let userToLogin = User.findByField("nombreUsuario", req.body.nombreUsuario);
        db.User.findOne({
            where: {
                nombreUsuario: req.body.nombreUsuario,
            }
        }).then(result => {
            var userToLogin = result;
            return userToLogin;
        }).then(userToLogin => {
            if (userToLogin) {
                if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if (req.body.recordar) {
                        res.cookie("userName", req.body.nombreUsuario, { maxAge: 1000 * 60 * 30 });
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
        });

    },

    userRegister: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const passwordcrypt = bcryptjs.hashSync(req.body.password, 12);
            let usuario = {
                id: getID(),
                nombreUsuario: req.body.nombreUsuario,
                nombrePila: req.body.nombrePila,
                apellido: req.body.apellido,
                email: req.body.email,
                password: passwordcrypt,
                telefono: req.body.telefono,
                direccion: null,
            };
            if (req.file) {
                usuario.imagenPerfil = req.file.filename;
            } else {
                usuario.imagenPerfil = "Portrait_Placeholder.png";
            };
            db.User.create({
                    ...usuario,
                })
                .then(result => {
                    return db.User.findOne({
                        where: {
                            nombreUsuario: result.nombreUsuario,}})
                }).then(result => {
                    var userToLogin = result;
                    return userToLogin;
                }).then(userToLogin => {
                    if (userToLogin) {
                        if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
                            delete userToLogin.password;
                            req.session.userLogged = userToLogin;
        
                            if (req.body.recordar) {
                                res.cookie("userName", req.body.nombreUsuario, { maxAge: 1000 * 60 * 30 });
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
                })
                .catch(err => {
                    res.send("error!: " + err)
                })
                // users.push(usuario);
                // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

            // res.send("¡Hay un nuevo entrenador pokemon!");
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            });
        }


    },
    edit: function(req, res) {
        db.User.update({
                nombreUsuario: req.body.nombreUsuario,
            }, {
                where: {
                    id: req.body.id
                }
            })
            .then(resultado => {
                res.send(resultado);
            })
            .catch(error => {
                res.send("Error!: " + error);
            });

    },
    destroy: function(req, res) {
        db.User.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(resultado => {
                res.send(resultado);
            })
            .catch(error => {
                res.send("Error!: " + error);
            });

    }
};

module.exports = controller;