var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/:url?', function (req, res) {
    console.log(req.params.url);
    var url = req.params.url;
    console.log("URL: " + url)
    switch (url) {
        case "survey":
            res.sendFile(path.join(__dirname, "../public/survey.html"));
            return;
        case !url:
            res.sendFile(path.join(__dirname, "../public/home.html"));
        default:
            res.sendFile(path.join(__dirname, "../public/home.html"));
            return;
    }
});

module.exports = router;
