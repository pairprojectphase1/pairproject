function Verify(req, res, next) {
  console.log(req.session, 'ini req session')
  console.log(req.params.id, 'ini req params')
  if (!req.session.login) {
    res.send('Cannot Access This Page')
  } else if (req.session.login.id != req.params.id) {
    res.send('Cannot Access This Page')
  } else {
    next()
  }
}
module.exports = Verify