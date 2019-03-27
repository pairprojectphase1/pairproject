const routes = require('express').Router();
const {Op} = require('sequelize')
const analyze = require('../helpers/analyzeComment')

const {
  Review,
  Apartment,
  User
} = require('../models')

routes.use((req, res, next) => {
  res.locals.analyzeIt = analyze
  next()
})


routes.get('/:aptId', (req, res) => {
  let apartmentData = null
  Apartment.findByPk(req.params.aptId, {
      include: {
        model: User
      }
    })
    .then(data => {
      apartmentData = data
      return Apartment.findAll({
        where: {
          location: apartmentData.location,
          id: {
            [Op.ne]: apartmentData.id
          }
        }
      })
    })
    .then(sameLocation => {
      // res.send(sameLocation)
      res.render('reviewViews/list', {
        data: apartmentData,
        sameLocation,
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})

module.exports = routes