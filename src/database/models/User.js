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
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        nombrePila: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: dataTypes.STRING(100),
        },
        imagenPerfil: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };
    let config = {
        timestamps:false
    }

    const Actor = sequelize.define(alias, cols, config);
    return Actor;


}