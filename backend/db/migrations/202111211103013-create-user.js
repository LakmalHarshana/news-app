'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      calculateEPF: {
        type: Sequelize.BOOLEAN,
        required: true,
        defaultValue: true,
      },
      password: {
        type: Sequelize.STRING,
        required: false,
      },
      NIC: {
        type: Sequelize.STRING,
        required: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  },
}
