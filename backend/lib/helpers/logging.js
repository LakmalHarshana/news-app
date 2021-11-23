const log4js = require('log4js')
let logger = { type: 'stdout' }
// if (process.env.ENV !== 'production') {
logger = {
  type: 'dateFile',
  filename: 'logs/server.log',
  pattern: '.yyyy-MM-dd',
  keepFileExt: true,
  daysToKeep: 30,
}
// }
log4js.configure({
  appenders: {
    out: logger,
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'error',
    },
  },
})
module.exports = log4js
