'use strict'

const Dotenv = require('dotenv').config()
const Confidence = require('confidence')
const Toys = require('toys')
if (Dotenv.error) {
  throw Dotenv.error
}

// Pull .env into process.env
// Dotenv.config({ path: `${__dirname}/.env` });
// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: process.env.HOST,
    port: {
      $env: 'PORT',
      $coerce: 'number',
      $default: 3000,
    },
    debug: {
      $filter: { $env: 'NODE_ENV' },
      $default: {
        log: ['error'],
        request: ['error'],
      },
      production: {
        request: ['implementation'],
      },
    },
    routes: {
      cors: true,
      validate: {
        failAction: async (request, h, err) => {
          // if (process.env.NODE_ENV === 'production') {
          //   // In prod, log a limited error message and throw the default Bad Request error.
          //   console.error('ValidationError:', err.message)
          //   throw Boom.badRequest(`Invalid request payload input`)
          // } else {
          // During development, log and respond with the full error.
          //   console.error(err);
          throw err
          // }
        },
      },
    },
  },
  register: {
    plugins: [
      {
        plugin: '../lib', // Main plugin
        options: {},
      },
      {
        plugin: './plugins/swagger',
      },
      {
        plugin: './plugins/sequalize',
      },
      {
        plugin: {
          $filter: { $env: 'NODE_ENV' },
          $default: 'hpal-debug',
          production: Toys.noop,
        },
      },
    ],
  },
})
