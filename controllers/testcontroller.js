var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.send('Hey!! This is a test route');
});

router.get('/bowler', function (req, res) {
    res.send("This is the bowler test route");
});

module.exports = router;
