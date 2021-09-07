module.exports = function(sequelize, dataTypes) {

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: dataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        },
        reviewsAmount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        price: {
            type: dataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        },
        brand: {
            type: dataTypes.STRING,
        },
    };

    let config = {
        tableName: "products",
        timestamps: false,
        modelName: alias
    }

    let Product = sequelize.define(alias, cols, config);

    Product.prototype.funcionDeInstancia = function() {};

    Product.associate = function(models) {
        Product.belongsToMany(models.Category, {
            as: "categories",
            through: models.ProductCategory,
            foreignKey: "id_product",
            otherKey: "id_category",
            timestamps: false,
        });

        Product.hasMany(models.Review,{
            as: "reviews",
            foreignKey: "id_product",
        });

        // Product.belongsToMany(models.Invoice,{
        //     as: "invoices",
        //     through: models.ProductInvoice,
        //     foreignKey: "id_product",
        //     otherKey: "id_invoice",
        //     timestamps: false,
        // });
    };

    return Product;
}