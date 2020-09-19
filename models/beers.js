/* eslint-disable camelcase */
// Creating our Beers model
module.exports = (sequelize, DataTypes) => {
  const Beers = sequelize.define("Beers", {
    beer_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Beers.associate = function(models) {
    Beers.belongsTo(models.Brewery, {
      foreignKey: {
        allowNull: false
      }
    });
    Beers.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beers;
};
