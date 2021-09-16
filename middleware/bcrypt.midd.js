const User = require('../models/entries')
const bcrypt = require('bcryptjs')
const { MongoDriverError } = require('mongodb')

const algo = {
    encryptPassword: async password => {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    },
    matchPassword: async (password) => {
        return await bcrypt.compare(password, this.password)
    }
}


module.exports = algo;