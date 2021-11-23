'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'News',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sourceName: {
          type: Sequelize.STRING,
        },
        author: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        url: {
          type: Sequelize.STRING,
        },
        urlToImage: {
          type: Sequelize.STRING,
        },
        publishedAt: {
          type: Sequelize.DATE,
        },
        content: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        underscored: true,
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('News')
  },
}
