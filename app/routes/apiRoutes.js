var express = require('express');
var router = express.Router();
var path = require('path');
var enemiesList = require('../data/enemies.js');

/* GET home page. */
router.get('/api/enemies', function(req, res) {
  return res.json(enemiesList)
});
router.post('/api/enemies', function(req, res) {
  //taking the JSON post sent upon survey submition
  var newEntry = req.body;
  console.log(newEntry);
  enemiesList.push(newEntry);
  // var length = enemies.length;
  var test = enemiesList[3].scores;
  res.json("yuuuuuup" + test);
})
module.exports = router;
