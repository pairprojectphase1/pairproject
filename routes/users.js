const router = require('express').Router()
const { User, Review , Apartment} = require('../models')
const { compare } = require('../helpers/bcrypt')
const Verify = require('../middlewares/verify')

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
      res.render('error', {err: err.message})
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
        res.redirect(`/`)
      } else {
        res.render('error', {err: 'Username / Password is wrong'})
      }
    })
    .catch(err => {
      res.render('error', {err: err.message})
    })
})

router.get('/profile/:id', Verify, (req, res) => {
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
    res.render('user/profile', {data : profileData, Reviews})
  })
  .catch(err => {
    res.render('error', {err: err.message})
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
      res.render('error', {err: err.message})
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