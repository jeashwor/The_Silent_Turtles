// Creating our Beers model
module.exports = (sequelize, DataTypes) => {
  const Beers = sequelize.define("Beers", {
    beerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brewery: {
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
