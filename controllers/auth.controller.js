const db = require('../utils/sql-db')
const Users = require('../models/entries')
const encrypt = require('bcryptjs')
const { response } = require('express')
const passport = require('passport')
const { auth_schema } = require('../middleware/regex_mid')


const register = {
    register: async (req, res) => {
        try {
            const result = await auth_schema.validateAsync(req.body)
            console.log(result);
            const { username, email, password, age, occupation, location, skills } = result;
                const salt = await encrypt.genSalt(10)
                let encryptPass = await encrypt.hash(password, salt)
                Users.setNew_user(username, email, encryptPass, age, occupation, location, skills)
                console.log('***Register created, user on DB added***');
                res.status(201).redirect('/')
        } catch (error) {
            res.status(200).render("register2",  error)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const getUser_byEmail = await Users.getUser_email(email)
            if (getUser_byEmail.rows[0].email == email) {
                const encryptPass= getUser_byEmail.rows[0].password
                encrypt.compare(password, encryptPass ,(err,result) => {
                    if(err){
                        throw new Error(err)
                    }
                    if(result){
                        // POR AQUI LE PASAS EL TOKEN CON JWT Y LAS COOKIES O POR DONDE QUIERAS BB
                        return res.status(200).redirect('/')
                    }else{
                        return res.status(401).send(' Invalid password ')
                    }
                })
        }
        } catch (error) {
            res.status(200).send("Email invalido, pruebe de nuevo"+ error)
        }
    }
}
module.exports = register;