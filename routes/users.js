const router = require('express').Router()
const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')

router.get('/registrasi', (req, res) => {
  res.render('user/registrasi')
})
.post('/registrasi', (req, res) => {
  User
    .create(req.body)
    .then(data => {
      res.redirect('/')
    })
    .catch(err => {
      res.send('masuk catch?')
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
      if (isValid) {
        req.session.login = {
          id: name.id,
          email: name.email
        }
        // console.log(req.session)
        res.redirect(`/`)
      } else {
        res.send('Username / Password is wrong')
      }
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.get('/logout', (req, res) => {
  if (req.session.login) {
    req.session.destroy()
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
})

module.exports = router