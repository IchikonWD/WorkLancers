const db = require('../utils/sql-db')
const bcryptjs = require('bcryptjs')
const Users =  require('../models/entries')

const register = {
    register: async (req, res) => {
        try {
            const { email, username, password, age, occupation, location, skills } = req.body;
            Users.setNew_user(email, username, password, age, occupation, location, skills)
            console.log('***Register created, user on DB added***');
            res.status(201).redirect('/')
        } catch (error) {
            res.status(200).send("Ha ocurrido un error" + error)
        }
    },
    login: async (req, res) => {

    }
}
module.exports = register;