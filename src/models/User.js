// 1. Guardar al usuario en la DB
// 2. Buscar al usuario que se quiere loguear por nombre de usuario: findByField
// 3. Buscar a un usuario por su ID: findByPk
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la DB

const fs = require("fs");
const path = require('path');

const User = {
    fileName: path.join(__dirname, "../database/users.json"),

    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    generateID: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id+1;
        }else{
            return 1;
        }
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound=allUsers.find(user=>user.id ===id);
        return userFound;
    },

    findByField: function(field,value){
        let allUsers = this.findAll();
        let userFound=allUsers.find(user=>user[field] === value);
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        
        if(!userData.imagenPerfil){
            userData.imagenPerfil = "Portrait_Placeholder.png";
        }

        let newUser ={
            id: this.generateID(),
            ...userData
        }
        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return newUser;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id);

        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
    }
}

module.exports=User;

// console.log(User.generateID());

// console.log(User.delete(21));

// console.log(User.create({nombreUsuario: "CabaioPan",
// nombrePila: "Caballo",
// email: "cabaiopan@mail.com",
// contraseña: "pan123456",
// apellido: "Pan",
// telefono: "5555111122",
// imagenPerfil: "Portrait_Placeholder.png"}));