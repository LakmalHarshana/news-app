'use strict'

module.exports = [
  {
    method: 'GET',
    path: '/healthcheck',
    options: {
      auth: false,
      handler: function (request, h) {
        return { isSuccess: true }
      },
      tags: ['api'],
    },
  },
]
