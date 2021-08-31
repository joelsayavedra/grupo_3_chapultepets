module.exports = function(sequelize, dataTypes){
        
    let alias = "ProductCategory";

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
    };

    let config = {
        tableName: "products_categories",
        timestamps: false,
        modelName: alias
    }

    let ProductCategory = sequelize.define(alias,cols,config);

    ProductCategory.prototype.funcionDeInstancia = function () {
    };

    return ProductCategory;
}