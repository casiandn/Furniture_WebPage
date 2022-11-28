const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'muebles'
});


module.exports.pool = pool;