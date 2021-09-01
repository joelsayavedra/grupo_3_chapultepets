const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        nombreUsuario: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        nombrePila: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        telefono: {
            type: dataTypes.STRING(12),
            allowNull: false,
        },
        direccion: {
            type: dataTypes.STRING(100),
        },
        imagenPerfil: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    };
    let config = {
        timestamps:false
    }

    const Actor = sequelize.define(alias, cols, config);
    return Actor;


}