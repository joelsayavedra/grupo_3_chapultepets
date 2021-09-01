const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "Invoice";
    let cols = {
        id: {
            type: dataTypes.STRING(36).UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        id_user: {
            type: dataTypes.STRING(36).UNSIGNED,
            allowNull: false,
        },
        total: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        sale_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        delivery_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        received_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        delivery_rating: {
            type: dataTypes.FLOAT,
            allowNull: false,
        },
        id_status:{
            type: dataTypes.STRING(36).UNSIGNED,
            allowNull: false,
        },
    };
    let config = {
        timestamps: false,
    };
    const invoice = sequelize.define(alias, cols, config);
    return invoice;
}
