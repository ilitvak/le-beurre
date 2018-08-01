var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'users'
});

connection.connect((err) => {
  if(err === null){
    console.log('Database connected!');
  } else {
    console.log('Database error connecting');
  }
});

let saveUser = (callback, data) => {
  connection.query(`INSERT INTO userLog (username, password) VALUES (?,?)`, [data.username, data.password], (err, res) => {
    if(err){
      callback(err);
    } else {
      console.log('res from database-mysql file is: ', res);
      callback(null, res)
    }
  })
}

let findUser = (callback, username) => {
  connection.query(`SELECT * FROM userLog WHERE username = ?`, [username], (err, res) => {
    if(err){ 
      callback(err);
    } else {
      callback(null, res)
    }
  })
}

let saveMeal = function(data, callback) {
  console.log('saveMEAL IN DB: ', data.meal);
  connection.query('INSERT INTO meals (food_item, username) VALUES (?,?)', [data.meal, data.username], (err, res) => {
    if(err){
      callback(err);
    } else {
      callback(null, res)
    }
  })
};

module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
module.exports.saveMeal = saveMeal;
