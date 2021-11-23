'use strict'

module.exports = {
  name: 'app-swagger',
  async register(server) {
    await server.register([
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swaggered'),
        options: {
          info: {
            title: 'Hapi API',
            description: 'Powered by coffee',
            version: '1.0',
          },
          auth: false,
          basePath: process.env.BASE_PATH,
          responseValidation: true,
          // documentationPage: process.env.ENV !== 'production',
        },
      },
      {
        plugin: require('hapi-swaggered-ui'),
        options: {
          title: 'Hapi API',
          path: '/docs',
          basePath: process.env.BASE_PATH,
          auth: false,

          authorization: {
            field: 'apiKey',
            scope: 'header', // header works as well
            defaultValue: 'demoKey',
            placeholder: 'Enter your apiKey here',
          },
        },
      },
    ])
  },
}
