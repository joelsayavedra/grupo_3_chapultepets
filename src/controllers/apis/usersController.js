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
        User.findByPk(req.params.id, {
            include:[
                 {association: "reviews"},
                {association: "invoices"},
            ]
        })
        .then(usuario => {
            let datosPublicos = {
                    id: usuario.id,
                    profilePicture: "/img/users/"+ usuario.imagenPerfil,
                    reviews: usuario.reviews,
                    invoices: usuario.invoices 
           };
            let respuesta = {
                meta: {
                    status: 200,
                    total: usuario.length,
                    url: '/api/actor/:id'
                },
                data: datosPublicos
            }
            res.json(respuesta);
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    },
    'userCheck' : function (req,res){
        User.findOne({
            where: 
            {
                nombreUsuario: req.params.userName,
            }
        })
        .then((resultado)=>{
            let result={nombreUsuario:""}
            if (resultado==null){
                result.nombreUsuario="empty"
            }
            else{
                result.nombreUsuario=resultado.nombreUsuario
            }
            res.json(result);
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    },
    'emailCheck' : function (req,res){
        User.findOne({
            where: 
            {
                email: req.params.email,
            }
        })
        .then((resultado)=>{
            let result={email:""}
            if (resultado==null){
                result.email="empty"
            }
            else{
                result.email=resultado.email
            }
            res.json(result);
        })
        .catch(error=>{
            return res.json({
                meta: {
                    status: "error",
                },
                data: error
            })
        });
    }
};

module.exports=controller;