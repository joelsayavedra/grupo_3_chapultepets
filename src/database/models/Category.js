module.exports = function(sequelize, dataTypes){
        
    let alias = "Category";

    let cols={
        id: {
            type: dataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    let config = {
        tableName: "categories",
        timestamps: false,
        modelName: alias
    }

    let Category = sequelize.define(alias,cols,config);

    Category.prototype.funcionDeInstancia = function () {
    };

    Category.associate = function(models){
        Category.belongsToMany(models.Product,{
            as: "products",
            through: models.ProductCategory,
            foreignKey: "id_category",
            otherKey: "id_product",
            timestamps: false,
        });
    };
    // Alimento.associate = function(models){
    //     Alimento.belongsTo(models.Marca,{
    //         as: "marca",
    //         foreignKey: "id_marca",
    //     });

    //     Alimento.belongsToMany(models.Platillo,{
    //         as: "platillos",
    //         through: models.AlimentoPlatillo,
    //         foreignKey: "id_alimento",
    //         otherKey: "id_platillo",
    //         timestamps: false,
    //     });
    // };

    return Category;
}