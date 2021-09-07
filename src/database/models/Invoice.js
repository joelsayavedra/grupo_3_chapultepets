module.exports = (sequelize, dataTypes) => {
    let alias = "Invoice";
    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        id_user: {
            type: dataTypes.STRING(36),
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
        id_status: {
            type: dataTypes.STRING(36),
            allowNull: false,
        },
    };
    let config = {
        timestamps: false,
    };
    const Invoice = sequelize.define(alias, cols, config);
    Invoice.associate = (models) => {

        Invoice.belongsTo(models.User, {
            as: "users",
            foreignKey: "id_user",
            timestamps: false,
        });

        Invoice.belongsTo(models.Status, {
            as: "statuses",
            foreignKey: "id_status",
            timestamps: false,
        });

        Invoice.belongsToMany(models.Product, {
            as: "products",
            through: models.ProductInvoice,
            foreignKey: "id_invoice",
            otherKey: "id_product",
            timestamps: false,
        });
    };

    return Invoice;
}