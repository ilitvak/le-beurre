var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');

var apiKey = '42bde76584da169d3b211bed0d9ca57e';
var apiID = '7d56ab21';

var app = express();

// initiate middleware
app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
});

// searching a users query
app.post('/userQuery', (req, res) => {
  console.log('Req coming in is: ', req.body);
  let searchItem = req.body.userInput;

  // get request to api for searched item
  axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${searchItem}`, {
    headers: {
      "x-app-id": apiID,
      "x-app-key": apiKey
    }
  })
  .then((response) => {
    // make another axios get request for the specific item that the user chose




    console.log('SUCCESS: sending data from api: ', response.data);
    res.send(response.data);
  })
  .catch((response) => {
    console.log('ERROR retrieving data from api: ', response);
    res.send(response)
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

