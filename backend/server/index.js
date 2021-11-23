'use strict'

const Glue = require('@hapi/glue')
const Manifest = require('./manifest')
// const schedule = require('node-schedule')
const Lalalambda = require('lalalambda')
const { dataBaseSetup } = require('../lib/helpers/instance')
process.env.TZ = 'Asia/Colombo'

exports.deployment = async (start) => {
  // console.log(process.env)
  const manifest = Manifest.get('/')
  const server = await Glue.compose(manifest, { relativeTo: __dirname })
  // console.log(process.env.SENTRY_ENABLED === 'true')
  // if (process.env.SENTRY_ENABLED === 'true') {
  //   await server.register({
  //     plugin: require('hapi-sentry'),
  //     options: {
  //       client: {
  //         dsn: process.env.SENTRY_DSN,
  //         environment: process.env.SENTRY_ENV,
  //       },
  //     },
  //   })
  // }
  await server.register({
    plugin: Lalalambda,
    options: {
      lambdaify: true, // Creates a lambda named "server" by default
    },
  })
  server.lambda({
    id: 'database_setup',
    options: {
      handler: async (event, context) => {
        await dataBaseSetup()
      },
    },
  })
  await server.initialize()

  if (!start) {
    return server
  }

  await server.start()

  console.log(`Server started at ${server.info.uri}`)

  // for cron jobs
  // schedule.scheduleJob('0 0 1 * *', async () => {

  // })

  return server
}

if (!module.parent) {
  exports.deployment(true)

  process.on('unhandledRejection', (err) => {
    throw err
  })
}
