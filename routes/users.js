const router = require('express').Router()
const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const session = require('express-session')


router.get('/', (req, res) => {
  // console.log(req.session.login, ' ==================== ini apa sih')
  res.render('user/homepage')
})

router.get('/registrasi', (req, res) => {
  User
    .findAll()
    .then(user => {
      res.render('user/registrasi', { data: user })
    })
})
router.post('/registrasi', (req, res) => {
  let { body } = req
  User
    .create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    })
    .then(data => {
      res.redirect('/homepage')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/login', (req, res) => {
  res.render('user/login')
})
router.post('/login', (req, res) => {
  let { body } = req
  User
    .findOne({
      where: {
        email: body.email
      }
    })
    .then(name => {
      let isValid = compare(req.body.password, name.password);
      // console.log(isValid)
      if (isValid) {
        console.log(req.session)
        req.session.login = {
          id: name.id,
          email: name.email
        }
        // console.log(req.session)
        res.redirect(`/homepage`)
      } else {
        res.send('Username / Password is wrong')
      }
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.get('/logot', (req, res) => {
  if (req.session.login) {
    req.session.destroy()
    res.redirect('/homepage')
  } else {
    res.redirect('/login')
  }
})

module.exports = router