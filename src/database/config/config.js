require('dotenv').config();

module.exports = {
  development: {
    host: process.env.HOSTNAME,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB_NAME,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: process.env.MYSQL_DIALECT,
  },
  production: {
    host: process.env.HOSTNAME,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB_NAME,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: process.env.MYSQL_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
