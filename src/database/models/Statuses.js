const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "Statuses";
    let cols = {
        id: {
            type: dataTypes.String(36),
            allowNull: false,
        },
        name: {
            type: dataTypes.String(20),
            allowNull: false,
        }
    };
    let config = {
        timestamps: false,
    }
    let Statuses = sequelize.define(alias, cols, config);
    
    return Statuses;
}