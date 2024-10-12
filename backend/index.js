const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const loginRouter = require('./controller/login')
const orderRouter = require('./controller/order')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

mongoose.set('strictQuery', false)

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info('MongoDB connected'))
  .catch((error) => console.error('error connecting to MongoDB:', error.message))

app.use('/api/login', loginRouter)
app.use('/api/order', orderRouter)

app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
