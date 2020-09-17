// Creating our Brewery model
module.exports = (sequelize, DataTypes) => {
    const Brewery = sequelize.define("Brewery", {
        brewery_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            }
        },
        brewery_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coordinates: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: true,
            }
        },
        beer_list: {
            type: DataTypes.ARRAY,
            allowNull: true,
        },
        website_url: {
            type: DataTypes.VARCHAR(2083),
            allowNull: false,
        }
    });
    return Brewery;
};