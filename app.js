const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 4000;
const routes = require('./routes')

// app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static('./public'))
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static('public'))
app.use('/', routes)

app.listen(port, () => console.log('Connecting to port', port));