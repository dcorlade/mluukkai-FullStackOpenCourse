const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, password, role } = request.body
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  if (role === 'admin') {
    return response.status(403).json({
      error: 'Cannot create admin accounts through registration'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    role: 'client',
    cart: []
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('cart.product')
  response.json(users)
})

module.exports = usersRouter