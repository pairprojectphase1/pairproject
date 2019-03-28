'use strict';
const rating = require('../helpers/rating')

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    UserId: DataTypes.INTEGER,
    ApartmentId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(instanceReview, options) {
        instanceReview.rating = rating(instanceReview.comment)
      }
    }
  });
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};