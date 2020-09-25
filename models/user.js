// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

// Creating our User model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
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
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        len: [5, 5]
      }
    },
    favoriteBreweryType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
    if (user.name === "admin" && user.email === "admin@email.com") {
      user.admin = true;
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Beer, { as: "beer", onDelete: "cascade" });
  };

  return User;
};
