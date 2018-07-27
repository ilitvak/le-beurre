var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'users'
});

connection.connect();

let saveUser = (callback, data) => {
  connection.query(`INSERT INTO userlog (user, pass), VALUES (?,?)`, [data.user, data.password], (err, res) => {
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
