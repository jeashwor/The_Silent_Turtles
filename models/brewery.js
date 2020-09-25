// Creating our Brewery model
module.exports = (sequelize, DataTypes) => {
  const Brewery = sequelize.define("Brewery", {
    breweryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    breweryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coordinates: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    websiteUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Brewery.associate = function(models) {
    Brewery.hasMany(models.Beer, { as: "beer" });
  };
  return Brewery;
};
