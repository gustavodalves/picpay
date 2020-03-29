const express = require('express');
const bodyParser = require('body-parser');
var hbs = require('express-hbs');



//route

const picpay = require('./route/picpay/picpay.router');

const app = express();



 
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', picpay)

app.listen(3000);

module.exports = app;