
const routes = require('express').Router();
const aptRoutes = require('./aptRoutes')
const session = require('express-session')
const reviewRoutes = require('./reviewRoutes')
const userRoutes = require('./users')
const analyze = require('../helpers/analyzeComment')
const formatDate = require('../helpers/formatDate')

routes.use(session({ secret: 'keyboard cat' }))

routes.use((req, res, next) => {
  if(!req.session.login) {
    res.locals.login = null
  } else {
    res.locals.login = req.session.login
  }
  next()
})

routes.use((req, res, next) => {
  res.locals.analyzeIt = analyze
  res.locals.getDate = formatDate
  next()
})

routes.get('/', (req, res) => {
  res.render('homepage');
})

routes.use('/users', userRoutes)
routes.use('/apartment', aptRoutes)
routes.use('/review', reviewRoutes)

routes.get('*', (req, res) => {
  res.render('error', {err: null})
})

module.exports = routes;