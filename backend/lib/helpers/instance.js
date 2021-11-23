
exports.dataBaseSetup = async () => {
  const { Sequelize } = require('sequelize')
  const Umzug = require('umzug')
  const opts = {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    opts
  )
  const migrations = new Umzug({
    migrations: { 
      params: [
        sequelize.getQueryInterface(),
        Sequelize // Sequelize constructor - the required module
      ],
      path: 'db/migrations',
      pattern: /\.js$/
     },
    context: sequelize.getQueryInterface(),
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize // here should be a sequelize instance, not the Sequelize module
    },
    logger: console
  })
  const seeders = new Umzug({
    migrations: { 
      params: [
        sequelize.getQueryInterface(),
        Sequelize // Sequelize constructor - the required module
      ],
      path: 'db/seeders',
      pattern: /\.js$/
     },
    context: sequelize.getQueryInterface(),
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize // here should be a sequelize instance, not the Sequelize module
    },
    logger: console
  })

  await migrations.up()
  await seeders.up()
}
