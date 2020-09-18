// Creating our Beers model
module.exports = (sequelize, DataTypes) => {
    const Beers = sequelize.define("Beers", {
        beer_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Beers.associate = (models) => {
    //     Beers.belongsTo(models.user, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    // Beers.associate = (models) => {
    //     Beers.belongsTo(models.brewery, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Beers;
};