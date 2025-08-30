const mysql = require('mysql2/promise');
const { mysql: mysqlCfg } = require('./config');
const pool = mysql.createPool({
    host: mysqlCfg.host,
    port: mysqlCfg.port,
    user: mysqlCfg.user,
    password: mysqlCfg.password,
    database: mysqlCfg.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: true,
});

module.exports = pool;