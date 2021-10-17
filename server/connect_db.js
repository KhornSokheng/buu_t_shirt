var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'burapha_t_shirt',
  multipleStatements: true
});

module.exports = pool;