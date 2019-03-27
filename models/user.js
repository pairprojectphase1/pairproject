'use strict';
const bcrypt = require('bcrypt')
const sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        // isEmail : true,
        validationEmail: function (email) {
          if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            throw new Error('Salah penamaan Email')
          }
        },
        isUnique : function(value) {
          return User.findOne( {
            where : {
              email : value
            }
          })
          .then(newData => {
            if(newData !== null) {
              throw new Error('Email is already Used')
            }
          })
        }
      }
    },
    password: DataTypes.STRING
  }, 
  {
    timestamps : false ,
    hooks : {
      afterValidate(User) {
        User.password = bcrypt.hashSync(User.password, bcrypt.genSaltSync(8))
      }
    }

  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};