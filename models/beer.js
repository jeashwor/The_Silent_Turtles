// Creating our Beers model
module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define("Beer", {
    // eslint-disable-next-line camelcase
    beer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brewery: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Beer.associate = function(models) {
    Beer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beer;
};
