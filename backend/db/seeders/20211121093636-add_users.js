'use strict'
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'admin@com.com',
          password: await bcrypt.hash('111111', 10),
          role: 'admin',
        },
        {
          id: uuidv4(),
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'author@com.com',
          role: 'author',
          password: await bcrypt.hash('111111', 10),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
}
