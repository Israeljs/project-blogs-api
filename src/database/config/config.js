require('dotenv').config();

module.exports = {
  development: {
    host: process.env.HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    host: process.env.HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
