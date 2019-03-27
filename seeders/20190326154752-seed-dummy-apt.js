'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Apartments', [{
        name: 'Taman Melati',
        location: 'Depok',
        telp: '08090909',
        price: 400000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Margonda Residence',
        location: 'Depok',
        telp: '01231909',
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Gandaria Heights',
        location: 'Depok',
        telp: '08123909',
        price: 500000,
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
     return queryInterface.bulkDelete('Apartments', null, {});
  }
};