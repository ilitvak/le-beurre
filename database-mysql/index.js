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
  console.log('DATA IS: ', data);
  connection.query(`INSERT IGNORE INTO userLog (user, passW) VALUES (?,?)`, [data.username, data.password], (err, res) => {
    if(err){
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

let saveCurrentMeal = function(callback, data) {
  connection.query('INSERT INTO meals ()')
};

module.exports.saveCurrentMeal = saveCurrentMeal;
module.exports.saveUser = saveUser;
