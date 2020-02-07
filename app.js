require('dotenv').config();
var express = require('express');
var app = express();
// var test = require('./controllers/testcontroller');
// var authTest = require('./controllers/authtestcontroller');
var sequelize = require('./db');
var bodyParser = require("body-parser");

var bowler = require('./controllers/bowlercontroller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require("./middleware/header"));

app.use('/api/bowler', bowler);

// app.use('/test-controller', test);

app.use(require("./middleware/validate-session"));
// protected routes from here on requiring session token


// app.use('/authtest', authTest);

app.listen(4000, function () {
    console.log('App is listening on port 4000');
});

