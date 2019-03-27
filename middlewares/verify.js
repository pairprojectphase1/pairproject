function Verify(req, res, next) {
  if(req.session.login.id === req.params.id) {
    next()
  } else {
    res.send('Cannot Access This Page')
  }
}
module.exports = Verify