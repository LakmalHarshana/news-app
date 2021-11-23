const JWT = require('jsonwebtoken') // used to sign our content
const { v4: uuidv4 } = require('uuid')
const Boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const logger = require('../helpers/logging').getLogger('server')
exports.login = async (request, reply) => {
  try {
    const { User } = request.getDb(process.env.DB_NAME).models
    const { email, password } = request.payload

    const row = await User.findOne({ where: { email } })
    if (!row) return Boom.badRequest('Incorrect email or password')
    const comparePassword = await bcrypt.compare(password, row.password)
    if (!comparePassword) return Boom.badRequest('Incorrect email or password')
    const session = {
      valid: true,
      id: uuidv4(), // a random session id
      exp: new Date().getTime() + 6 * 60 * 60 * 1000, // expires in 6 hours 6 * 60 * 60 *1000
      userId: row.id,
      role: row.role,
    }
    const token = JWT.sign(session, process.env.JWT_SECRET)
    return {
      token,
      userId: row.userId,
    }
  } catch (error) {
    console.log('exports.login -> error', error)
    logger.error('exports.login -> error', error)
    Boom.badImplementation()
    throw error
  }
}
