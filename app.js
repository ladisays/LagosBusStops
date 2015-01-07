
var express = require('express');
var app = express();
var router = require('./routes/index');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});



app.use('/', router);

app.listen(3000, function() {
  console.log('Listening on port 3000...\n');
});
























