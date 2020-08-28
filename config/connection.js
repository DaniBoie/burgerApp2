const mysql = require('mysql2')
module.exports = mysql.createConnection(process.env.JAWSDB_URL || 'mysql://root:-Fisher3385-@localhost/burgers_db')

