const db = require("../../database/models/index.js")

let User=db.User;

const controller = {
    "users": function(req,res){
        User.findAll()
        .then(usuarios=>{ //primer then
            let datosPublicos = usuarios.map(nick=>{
                let persona = {
                    id: nick.id,
                    userName: nick.nombreUsuario,
                    name : nick.nombrePila + " " + nick.apellido,
                    email: nick.email,
                    detail: "/api/users/" + nick.id, 
                }
                return persona;
            });
            let respuesta = {
                meta: {
                    status : 200,
                    Count: usuarios.length,
                    url: 'api/actors'
                },
                data: datosPublicos
            }
                res.json(respuesta);            
        }) // user: fin del primer then 
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    },
    "userByID" : function (req, res){
        User.findByPk(req.params.id)
        .then(usuario => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: usuario.length,
                    url: '/api/actor/:id'
                },
                data: actor
            }
            res.json(respuesta);
        });
    }

};

module.exports=controller;