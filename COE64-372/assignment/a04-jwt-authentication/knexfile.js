/** @type { import('knex').Knex.Config } */

const { mysql: mysqlCfg } = require('./src/config');

module.exports = {
    client: 'mysql2',
    connection: {
        host: mysqlCfg.host,
        user: mysqlCfg.user,
        password: mysqlCfg.password,
        database: mysqlCfg.database,
        charset: 'utf8mb4',
    },
    migrations: {
        tableName: 'migrations',
        directory: './src/database/migrations',
        extension: 'js',
    },
    seeds: {
        directory: './src/database/seeds',
        extension: 'js',
    },
    // สร้างหลาย env ได้: development, staging, production
};
