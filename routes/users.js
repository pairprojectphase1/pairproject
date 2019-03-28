const router = require('express').Router()
const { User, Review , Apartment} = require('../models')
const { compare } = require('../helpers/bcrypt')
const analyze = require('../helpers/analyzeComment')

router.use((req, res, next) => {
  res.locals.analyzeIt = analyze
  next()
})

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
      // res.send('masuk catch?')
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

router.get('/profile/:id', (req, res) => {
  let Reviews = null
  Review.findAll({
    where : {
      UserId : req.params.id
    }    
  })
  .then(data => {
    Reviews = data
    return User.findByPk(req.params.id, {
      include : {
        model : Apartment
      }
    })
  })
  .then(profileData => {
    // res.send(profileData)
    res.render('user/profile', {data : profileData, Reviews})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/profile/:id', (req, res) => {
  let { body } = req
  User
    .update({
      id: req.params.id,
      firstName: body['firstName'],
      lastName: body['lastName'],
      email: body['email'],
      password: body['password'],
    }, {
      where : {
        id :req.params.id
      }
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
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