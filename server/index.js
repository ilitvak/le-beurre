var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var items = require('../database-mysql');
var {saveUser} = require('../database-mysql/index.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {findUser} = require('../database-mysql/index.js');
// Irwins Account for Nutritionix API
var apiKey = '42bde76584da169d3b211bed0d9ca57e';
var apiID = '7d56ab21';

// Moms Account
// var apiID = '7924c8b1';
// var apiKey = 'cb539400181dcc3b917e2754b7fb3018';

var app = express();

// initiate middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
});

// Passport authentication for signup
passport.use(new LocalStrategy(
  { passReqToCallback: true },
  function(req, username, password, done) {
    findUser((err, user) => {
      console.log('User is: ', user);
      console.log('ERROR in db: ', err);
      if (err) {
        return done(err); 
      }
      if (user.length !== 0) {
        return done(null, false);
      } else {
        // save method here from database;
        saveUser((err, res) => {
          if(err){
            return done(err);
          } else {
            return done(null, {id: res.insertId})
          }
        }, req.body)
      }
    }, username);
  }
));

app.post('/signup', passport.authenticate('local', { session: false}), (req, res) => {
  console.log('User: ', req.user);
  console.log(`Req: ${req.body}`);

  res.send(req.user);
})

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
    //console.log('SUCCESS: sending data from api: ', response.data);
    res.send(response.data);
  })
  .catch((response) => {
    console.log('ERROR retrieving data from api: ', response);
    res.send(response)
  })
});

// getting nutrition info from user query 
app.post('/nutritionInfo', (req, res) => {
  console.log('REQUEST COMING IN: ', req.body.foodID);
  let foodID = req.body.foodID;
  // send a get request for nutrition info via axios
  axios.get('https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' + foodID, {
    headers: {
      "x-app-id": apiID,
      "x-app-key": apiKey
    }
  })
  .then((response) => {
    console.log('Response from api: ', response.data);
    res.send(response.data)
  })
  .catch((response) => {
    console.log('ERROR getting response from API: ', response);
    res.send(response);
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

