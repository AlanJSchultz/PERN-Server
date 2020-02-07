//jshint esversion:6

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Bowler = sequelize('../models/bowler.js');

var BowlingLogModel = sequelize.import('../models/bowlinglog.js');

// create a bowler log
router.post('/create', function (req, res) {
    var owner = req.bowler.id;
    var ballweight = req.body.bowlinglog.ballweight;
    var ballbrand = req.body.bowlinglog.ballbrand;
    var ballmodel = req.body.bowlinglog.ballmodel;
    var bowlingcenter = req.body.bowlinglog.bowlingcenter;
    var bowlinglanes = req.body.bowlinglog.bowlinglanes;
    var laneconditions = req.body.bowlinglog.laneconditions;
    var approachconditions = req.body.bowlinglog.approachconditions;
    var comments = req.body.bowlinglog.comments;
    var date = req.body.bowlinglog.date;

    BowlingLogModel.create({
        owner: owner,
        ballweight: ballweight,
        ballbrand: ballbrand,
        ballmodel: ballmodel,
        bowlingcenter: bowlingcenter,
        bowlinglanes: bowlinglanes,
        laneconditions: laneconditions,
        approachconditions: approachconditions,
        comments: comments,
        date: date
    }).then(
        function createSuccess(ballweight) {
            res.json({
                ballweight: ballweight,
                ballbrand: ballbrand,
                ballmodel: ballmodel,
                bowlingcenter: bowlingcenter,
                bowlinglanes: bowlinglanes,
                laneconditions: laneconditions,
                approachconditions: approachconditions,
                comments: comments,
                date: date
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

// get all logs for a bowler
router.get('/getall', function (req, res) {
    var bowlerid = req.bowler.id;
    BowlingLogModel.findAll({
        where: { owner: bowlerid }
    }).then (
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message);
        }
    );
});

// gets individual bowler log by :id# for an individual bowler
router.get('/getone/:id', function (req, res) {
    var primaryKey = req.params.id;
    var bowlerid = req.bowler.id;
    BowlingLogModel.findOne({
        where: {
            id: primaryKey,
            owner: bowlerid
        }
    }).then(
        data => {
            return res.json(data);
        }
    ),
    err => res.send(500, err.message);
});

// update individual bowler logs by a bowler
router.put('/update/id', function (req, res) {
    var owner = req.bowler.id;
    var primaryKey = req.params.id;
    var ballweight = req.body.bowlinglog.ballweight;
    var ballbrand = req.body.bowlinglog.ballbrand;
    var ballmodel = req.body.bowlinglog.ballmodel;
    var bowlingcenter = req.body.bowlinglog.bowlingcenter;
    var bowlinglanes = req.body.bowlinglog.bowlinglanes;
    var laneconditions = req.body.bowlinglog.laneconditions;
    var approachconditions = req.body.bowlinglog.approachconditions;
    var comments = req.body.bowlinglog.comments;
    var date = req.body.bowlinglog.date;

    BowlingLogModel.update({
        owner: owner,
        ballweight: ballweight,
        ballbrand: ballbrand,
        ballmodel: ballmodel,
        bowlingcenter: bowlingcenter,
        bowlinglanes: bowlinglanes,
        laneconditions: laneconditions,
        approachconditions: approachconditions,
        comments: comments,
        date: date
    },
    {where:{id: primaryKey, owner: owner}}
    ).then(
        data => {
            return res.json(data);
        }
    ),
    err => res.send(500, err.message);
});

//  delete individual bowler logs by a bowler
router.delete('delete/:id', function (req, res) {
    var primaryKey = req.params.id;
    var bowlerid = req.bowler.id;

    BowlingLogModel.destroy({
        where:{
            id: primaryKey,
            owner: bowlerid
        }
    }).then(data => {
        return data > 0
        ? res.send("Item was deleted")
        : res.send("Nothing deleted")
    }),
        err => res.send(500, err.message);
});


module.exports = router;
