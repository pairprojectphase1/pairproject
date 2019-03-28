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
        // console.log(instanceReview)
        instanceReview.rating = rating(instanceReview.comment)
        return sequelize.models.Review.findOne({
          where: {
            UserId: instanceReview.UserId,
            ApartmentId: +instanceReview.ApartmentId
          }
        })
        .then(found => {
          if (found) {
            throw new Error('You cant review on this apartment twice')
          }
        })
      }
    }
  });
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};