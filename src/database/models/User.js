const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = 'User'
    let cols = {
        id: {
            type: dataTypes.STRING(36).UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        nombreUsuario: {
            type: dataTypes.STRING(20).UNSIGNED,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(20).UNSIGNED,
            allowNull: false,
        },
        nombrePila: {
            type: dataTypes.STRING(20).UNSIGNED,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(45).UNSIGNED,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(60).UNSIGNED,
            allowNull: false,
        },
        telefono: {
            type: dataTypes.String(12).UNSIGNED,
            allowNull: false,
        },
        direccion: {
            type: dataTypes.String(100).UNSIGNED,
        },
        imagenPerfil: {
            type: dataTypes.STRING(45).UNSIGNED,
            allowNull: false,
        },
    };
    let config = {
        timestamps:false
    }

    const Actor = sequelize.define(alias, cols, config);
    return Actor;


}