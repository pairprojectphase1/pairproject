const express = require('express');
const app = express();
const port = 4000;
const session = require('express-session')


const indexRoutes = require('./routes/users');
const userRoutes = require('./routes/users')


app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat' }))

app.use((req, res, next) => {
  if(!req.session.login) {
    res.locals.login = null
  } else {
    res.locals.login = req.session.login
  }
  next()
})
app.use('/homepage', indexRoutes);
app.use('/users', userRoutes);

app.listen(port, () => console.log('Connecting to port', port));