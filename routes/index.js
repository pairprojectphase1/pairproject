
const routes = require('express').Router();
const aptRoutes = require('./aptRoutes')
const session = require('express-session')
const reviewRoutes = require('./reviewRoutes')
const userRoutes = require('./users')

routes.use(session({ secret: 'keyboard cat' }))

routes.use((req, res, next) => {
  if(!req.session.login) {
    res.locals.login = null
  } else {
    res.locals.login = req.session.login
  }
  next()
})

routes.get('/', (req, res) => {
  res.render('homepage');
})


routes.use('/users', userRoutes)
routes.use('/apartment', aptRoutes)
routes.use('/review', reviewRoutes)

module.exports = routes;