const routes = require('express').Router();
const {Op} = require('sequelize')

const {
  Review,
  Apartment,
  User
} = require('../models')

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
      res.render('reviewViews/list', {
        data: apartmentData,
        sameLocation,
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})
.post('/:aptId', (req, res) => {
  Review.create({
    UserId: req.session.login.id,
    ApartmentId: req.params.aptId,
    comment: req.body.comment
  })
  .then(() => {
    res.redirect(`/review/${req.params.aptId}`)
  })
  .catch(err => {
    res.send(err.message)
  })
})

module.exports = routes