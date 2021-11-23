// const Boom = require('@hapi/boom')

// const jwt = require('jsonwebtoken')
// const logger = require('./logging').getLogger('server')

// validate JWT payload
exports.validate = async (decoded, request) => {
  const time = new Date().getTime()
  let errorMessage = null;
  let isValid = true;
  if(time > decoded.exp){
    errorMessage = 'Token expired'
    isValid = false
  }
  return {
    errorMessage,
    isValid,
    credentials: isValid ? decoded : null,
  }
}

