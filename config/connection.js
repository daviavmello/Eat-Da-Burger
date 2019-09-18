let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: '050994',
    database: 'burgers_db'
});

connection.connect((err) => {
    if(err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});

// Exports 'connection' for ORM use
module.exports = connection;