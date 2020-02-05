//jshint esversion:6

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Bowler = sequelize.import('../models/bowler.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// create a new user
router.post('/createbowler', function (req, res) {
    
    var firstName = req.body.bowler.firstname;
    var lastName = req.body.bowler.lastname;
    var password = req.body.bowler.password;
    var email = req.body.bowler.email;
    var passwordhash = password;
    var teamName = req.body.bowler.teamname;

    Bowler.create({
        firstname: firstName,
        lastname: lastName,
        email: email,
        passwordhash: bcrypt.hashSync(password, 10),
        teamname: teamName
    })
    .then (

        function createSuccess(bowler) {
            var token = jwt.sign({
                id: bowler.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
            res.json({
                bowler: bowler,
                message: 'bowler created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

// login existing user
router.post("/loginbowler", function (req, res) {
    var email = req.body.bowler.email;
    var password = req.body.bowler.password;

    Bowler.findOne({
        where: { email: email }
    })
    .then(bowler => {
        bowler ? comparePasswords(bowler) : res.send("User not found in our database ");

        function comparePasswords(bowler) {
            bcrypt.compare(password, bowler.passwordhash, function (err, matches) {
                matches ? generateToken(bowler) : res.send("Incorrect Password");
            });
        }

        function generateToken(bowler) {
            
            var token = jwt.sign({
                id: bowler.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });

            res.json({
                bowler: bowler,
                message: 'session token created',
                sessionToken: token
            });
        }
    });
});

module.exports = router;
