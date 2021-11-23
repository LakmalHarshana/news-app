'use strict'

const HauteCouture = require('haute-couture')
const Package = require('../package.json')
const { validate } = require('../lib/helpers/auth')
exports.plugin = {
  pkg: Package,
  register: async (server, options) => {
    console.log('options', options)

    // Custom plugin code can go here

    // await server.route({
    //   method: '*',
    //   path: '/{any*}',
    //   handler: function (request, h) {
  
    //     console.log('Server.route')
    //   }
    // })

    await server.register(require('hapi-auth-jwt2'))
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET, // Never Share your secret key
      validate, // validate function defined above
      verifyOptions: { algorithms: ['HS256'] },
      // responseFunc: (request, h) => {
      //   console.log('request', request)
      // },
    })

    server.auth.default('jwt')

    await HauteCouture.using(null, {
      remove: ['models'], // remove models from being processed
    })(server, options)
  },
}
