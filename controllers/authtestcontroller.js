//jshint esversion:6

var express = require('express');
var router = express.Router();
var sequelize = require.resolve('../db.js');
var Bowler = sequelize.import('../models/bowler.js');

var AuthTestModel = sequelize.import('../models/authtest.js');

