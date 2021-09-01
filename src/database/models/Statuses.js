const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "Statuses";
    let cols = {
        id: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false,
        }
    };
    let config = {
        timestamps: false,
    }
    let Statuses = sequelize.define(alias, cols, config);
    
    return Statuses;
}