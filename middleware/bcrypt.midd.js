const User = require('../models/entries')
const bcrypt = require('bcryptjs')
const { MongoDriverError } = require('mongodb')

const encryp_password = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}

module.exports = encryp_password, matchPassword; 