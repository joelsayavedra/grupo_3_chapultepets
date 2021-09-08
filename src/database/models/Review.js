module.exports = function(sequelize, dataTypes) {

    let alias = "Review";

    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        id_product: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
        id_user: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
        review: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        tableName: "reviews",
        timestamps: false,
        modelName: alias
    }

    let Review = sequelize.define(alias, cols, config);

    Review.prototype.funcionDeInstancia = function() {};

    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user",
        });

        Review.belongsTo(models.Product, {
            as: "product",
            foreignKey: "id_product",
        });
    };

    return Review;
}