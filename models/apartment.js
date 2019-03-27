'use strict';
module.exports = (sequelize, DataTypes) => {
  const Apartment = sequelize.define('Apartment', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Apartment.associate = function(models) {
    // associations can be defined here
    Apartment.belongsToMany(models.User, {through: models.Review})
  };
  return Apartment;
};