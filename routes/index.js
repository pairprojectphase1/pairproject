const routes = require('express').Router();
const aptRoutes = require('./aptRoutes')
const reviewRoutes = require('./reviewRoutes')


routes.get('/', (req, res) => {
  res.json({ message: 'Connected' });
})

routes.use('/apartment', aptRoutes)
routes.use('/review', reviewRoutes)

module.exports = routes;