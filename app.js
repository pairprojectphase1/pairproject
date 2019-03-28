const express = require('express');
const app = express();
const port = 4000;
const routes = require('./routes')

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/', express.static('/'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static('public'))
app.use('/', routes)

app.listen(port, () => console.log('Connecting to port', port));