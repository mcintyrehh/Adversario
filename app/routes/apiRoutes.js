var express = require('express');
var router = express.Router();
var path = require('path');
var enemiesList = require('../data/enemies.js');

/* GET home page. */
router.get('/api/enemies', function (req, res) {
  return res.json(enemiesList)
});
router.post('/api/enemies', function (req, res) {
  //taking the JSON post sent upon survey submition
  var newEntry = req.body;
  var newScores = newEntry.scores;
  //using the map method to run an int parser on each element, returns a new array which replaces the original
  var intParsed = newScores.map(function (x) {
    return parseInt(x, 10);
  })
  newEntry.scores = intParsed;
  enemiesList.push(newEntry);
  var archEnemyRes = compareScores(newEntry.scores, enemiesList);
  res.json(archEnemyRes);
})
module.exports = router;

function compareScores(newUserScores, answersArray) {
  //empty array to push our summed differences to
  var totalsArray = [];
  //initializing a var to keep a running total in the for loop
  var subtotal = 0;  
  // initialzing a high water mark var and winner var
  var highestDiff = 0;
  var archEnemy;
  //for every element of the array of objects, run a for loop
  //that compares values at for each question and adds the absolute
  //difference to the subtotal, then pushes the summed difference to the totals array
  answersArray.forEach(function (element) {
    subtotal = 0;
    for (i=0; i<10; i++) {
     subtotal += Math.abs(parseInt(newUserScores[i]) - parseInt(element.scores[i]))
    }
    if (subtotal > highestDiff) {
      highestDiff = subtotal;
      console.log(highestDiff);
      archEnemy = element;
    }
    totalsArray.push(subtotal);
  })
  console.log(totalsArray);
  console.log(archEnemy);
  return archEnemy;
}