const User = require('../models/user')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer '))
    return response.status(401).json({ error: 'invalid token' })

  request.token = authorization.replace('Bearer ', '')
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'invalid token' })
  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(401).json({ error: 'user not found' })
  request.user = user
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  userExtractor,
  tokenExtractor,
}
