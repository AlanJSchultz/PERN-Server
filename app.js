require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require("body-parser");

var bowler = require('./controllers/bowlercontroller');
var bowlinglog = require('./controllers/bowlinglogcontroller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require("./middleware/header"));

app.use('/api/bowler', bowler);

app.use(require("./middleware/validate-session"));
// protected routes follow requiring session token

app.use('/api/bowlinglog', bowlinglog);

app.listen(4000, function () {
    console.log('App is listening on port 4000');
});

