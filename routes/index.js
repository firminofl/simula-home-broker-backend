var express = require('express');
var router = express.Router();
// Using the default API (attention for the final function call):
const bovespa = require("bovespa")();
var request = require('request')

/* GET home page. */
router.get('/', function (req, res, next) {
  request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=LEVE3.SA&apikey=U9XAE4AJ73JY5S22', (error, response) => {
    if (!error && response.statusCode == 200) {
      console.log(response.body);
    } else if (!error && response.statusCode == 404) {
      
    }
  })
  // What is received:
  //bovespa("BIDI4", "2018-08-02").then(console.log);
  res.render('index', { title: 'Express' });
});

module.exports = router;
