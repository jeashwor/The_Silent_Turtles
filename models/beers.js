// Creating our Beers model
module.exports = (sequelize, DataTypes) => {
    const Beers = sequelize.define("Beers", {
        beer_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Beers;
};