'use strict'
const Joi = require('@hapi/joi')

const { login } = require('../controllers/auth')
module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth: false,
      description: 'Health check',
      handler: function (request, h) {
        return {
          message: 'This is the news api - goto /docs to get api documentation',
        }
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    options: {
      cors: true,
      auth: false,
      description: 'Login',
      validate: {
        payload: Joi.object({
          email: Joi.string().required().trim(),
          password: Joi.string().required().trim(),
        }),
      },
      tags: ['api'],
      handler: login,
    },
  },
]
