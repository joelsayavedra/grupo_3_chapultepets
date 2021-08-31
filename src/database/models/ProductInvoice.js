module.exports = function(sequelize, dataTypes){
        
    let alias = "ProductInvoice";

    let cols={
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        id_product: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
        id_category: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
        sold_price: {
            type: dataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        },
    };

    let config = {
        tableName: "products_invoices",
        timestamps: false,
        modelName: alias
    }

    let ProductInvoice = sequelize.define(alias,cols,config);

    ProductInvoice.prototype.funcionDeInstancia = function () {
    };

    return ProductInvoice;
}