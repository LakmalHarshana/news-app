require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeederLog',
    // dialectOptions: {
    //   useUTC: false, // for reading from database
    // },
    // timezone: '+05:30', // for writing to database
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeederLog',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+05:30', // for writing to database
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeederLog',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+05:30', // for writing to database
  },
}
