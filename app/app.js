var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var htmlRouter = require('./routes/htmlRoutes');
var apiRouter = require('./routes/apiRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', htmlRouter, apiRouter);

module.exports = app;

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
