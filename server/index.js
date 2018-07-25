var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// initiate middleware
app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

