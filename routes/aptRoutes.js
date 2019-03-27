const routes = require('express').Router();
const {
  Apartment
} = require('../models')

routes.get('/', (req, res) => {
  Apartment.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    .then(apartments => {
      res.render('apartmentViews/list', {
        apartments
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})

routes.get('/add', (req, res) => {
    res.render('apartmentViews/add')
  })
  .post('/add', (req, res) => {
    Apartment.create(req.body)
      .then(() => {
        res.redirect('/apartment')
      })
      .catch(err => {
        res.send(err.message)
      })
  })

routes.get('/edit/:id', (req, res) => {
    Apartment.findByPk(req.params.id)
      .then(apartment => {
        res.render('apartmentViews/edit', {
          apartment
        })
      })
      .catch(err => {
        res.send(err.message)
      })
  })
  .post('/edit/:id', (req, res) => {
    Apartment.update(req.body, {
        where: {
          id: +req.params.id
        }
      })
      .then(() => {
        res.redirect('/apartment')
      })
      .catch(err => {
        res.send(err.message)
      })
  })

// routes.get('/delete/:id', (req, res) => {
//   Apartment.destroy({
//       where: {
//         id: +req.params.id
//       }
//     })
//     .then(() => {
//       res.redirect('/Apartments')
//     })
//     .catch(err => {
//       res.send(err.message)
//     })
// })

module.exports = routes;