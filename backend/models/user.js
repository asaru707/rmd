const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: async function (username) {
        const user = await this.constructor.findOne({ username })
        return !user
      },
      message: 'username already exists',
    },
    minLength: [3, 'password must be at least 3 characters long'],
  },
  name: String,
  password: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
