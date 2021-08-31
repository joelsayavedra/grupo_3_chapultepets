const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "ProductInvoice";
    let cols = {
        
    };
    let config = {
        timestamps:false
    };

    const ProductInvoice = sequelize.define(alias,cols,config);
    return ProductInvoice;
};