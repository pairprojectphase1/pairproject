'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Reviews', [{
      "UserId": 3,
      "ApartmentId": 3,
      "rating": 3,
      "comment": `This is one of my top 10 list to visit. It is a fun place. You should go early when less people. Avoid going in the afternoon because too many people. Love this place, we took so many beautiful pictures. It only take few hours here. `,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 3,
      "ApartmentId": 2,
      "rating": 5,
      "comment": `Street art village exemifies the unification of creative innovation and community. Former soldier Huang Yung Fu made the decision not to sell to corporate redevelopers.`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 3,
      "ApartmentId": 4,
      "rating": 5,
      "comment": `We rent a driver for a day and make Rainbow Village as our first stop. It is a very colorful painted house and we managed to take a photo with the 90 years old man. This is the most instagrammable place which can create a happy fun memory.`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 1,
      "ApartmentId": 3,
      "rating": 5,
      "comment": `Very small "Village" with lots of painted murals and artwork adorning its walls - albeit kitschy, but free. If it's on your way, stop by and have a look, but not worth taking a special trip there`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 2,
      "ApartmentId": 2,
      "rating": 3,
      "comment": `Went here when we travelled to Taichung. Was expecting more to see but it's just a small area that's filled with colorful paint. Really nothing more than that. I'd recommend to skip it.  `,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 3,
      "ApartmentId": 2,
      "rating": 4,
      "comment": `It is outside of city. If you don’t have enough time, you can forget this place. There are some painted houses, and that’s all. However, this kind of village is maybe unique. The motifs are also unique. As it became a tourist attraction`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 2,
      "ApartmentId": 4,
      "rating": 4,
      "comment": `Wouldn't recommend this place if you are on a tight schedule. There isn't much to see. It is just a small place in the middle of a field. I think we only spent 10 minutes there.  `,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 3,
      "ApartmentId": 1,
      "rating": 1,
      "comment": `The village is not close to the city and it is located at somewhere residential which there wont be any tourist attractions close to it. Caihongjuan village is small`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 2,
      "ApartmentId": 2,
      "rating": 5,
      "comment": `Small area with a few houses painted. I didnt find it photo-worthy and certainly think it is quite a waste of time.  `,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "UserId": 2,
      "ApartmentId": 3,
      "rating": 1,
      "comment": `We took a cab & the journey was a little too long too expensive. The moment we got out of the cab I thought the cab driver had took us to the wrong place as there stand an old house painted in red & many other colours.`,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};