module.exports = (sequelize, dataTypes) => {
    let alias = "Status";
    let cols = {
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
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
    let Status = sequelize.define(alias, cols, config);

    Status.associate = (models) => {
        Status.hasMany(models.Invoice, {
            as: "invoices",
            foreignKey: "id_status"
        });
    };

    return Status;
}