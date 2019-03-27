'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    UserId: DataTypes.INTEGER,
    ApartmentId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};