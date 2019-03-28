const routes = require('express').Router();
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage')

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

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
      res.render('error', {err: err.message})
    })
})

routes.get('/add', (req, res) => {
    res.render('apartmentViews/add')
  })
  .post('/add', upload, (req, res) => {
    Apartment.create({
        ...req.body,
        images: '/' + req.file.path.slice(7)
      })
      .then(() => {
        res.redirect('/apartment')
      })
      .catch(err => {
        res.render('error', {err: err.message})
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
        res.render('error', {err: err.message})
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
        res.render('error', {err: err.message})
      })
  })

routes.get('/search', (req, res) => {
  Apartment.findAll({
      where: {
        location: req.query.location
      }
    })
    .then(apartments => {
      if (!apartments.length) {
        res.render('error', {err: `There is no apartments in ${req.query.location}`})
      } else {
        res.render('apartmentViews/list', {
          apartments
        })
      }
    })
    .catch(err => {
      res.render('error', {err: err.message})
    })
})

module.exports = routes;