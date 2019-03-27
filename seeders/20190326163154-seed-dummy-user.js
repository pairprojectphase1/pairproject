'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Ibrahim',
        lastName: 'Boss',
        email: 'ibrahim@boss.com',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Arief',
        lastName: 'Cool',
        email: 'arief@cool.com',
        password: '456',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        firstName: 'Rudi',
        lastName: 'OK',
        email: 'rudi@ok.com',
        password: '789',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
