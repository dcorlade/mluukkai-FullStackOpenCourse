require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      mongoose.connection.close()
      return
    }

    const password = process.env.ADMIN_PASSWORD

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const admin = new User({
      username: 'admin',
      passwordHash,
      role: 'admin',
      cart: []
    })

    await admin.save()
    console.log('Admin user created successfully')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error creating admin user:', error.message)
    mongoose.connection.close()
  }
}

createAdminUser()