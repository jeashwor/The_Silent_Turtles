// Creating our User model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        msg: "Your zip code must ",
        len: [5, 5]
      }
    },
    favorite_beer_type: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return User;
};