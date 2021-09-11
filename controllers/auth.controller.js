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
            const { username, email, password, age, occupation, location, skills } = result;
            const salt = await encrypt.genSalt(10)
            let encryptPass = encrypt.hash(password, salt)
            try { //Pruebo que no exista el email primero para que no se mezcle con los creados con Google
                let user_email = await Users.getUser_email(email)
                if (user_email.rows.length === 0) { 
                    await Users.setNew_user(username, email, encryptPass, age, occupation, location, skills)
                    console.log('***Register created, user on DB added***');
                    res.status(201).redirect('/')
                }else{ //Aqui faltaria enviarle un mensaje de error para sacarlo en el pug, pero me da problemas el .render()
                    console.log('entramos *******');
                    res.status(201).redirect('/register/email')
                }
            } catch (error) {
            console.log(error);
            res.status(201).render("register2", error)
            }
        } catch (error) {
            console.log(error);
            res.status(201).render("register2", error)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const getUser_byEmail = await Users.getUser_email(email)
            if (getUser_byEmail.rows[0].email == email) {
                const encryptPass = getUser_byEmail.rows[0].password
                encrypt.compare(password, encryptPass, (err, result) => {
                    if (err) {
                        throw new Error(err)
                    }
                    if (result) {
                        // POR AQUI LE PASAS EL TOKEN CON JWT Y LAS COOKIES O POR DONDE QUIERAS BB
                        return res.status(200).redirect('/')
                    } else {
                        return res.status(401).send(' Invalid password ')
                    }
                })
            }
        } catch (error) {
            res.status(200).send("Email invalido, pruebe de nuevo" + error)
        }
    },
    fail: async (req, res) => {
        let errMsj = 'The email already exist or something went wrong' 
        req.flash('fail_login', errMsj) 
        res.status(200).redirect('/login')
        //En caso de fail le redirijo a login y le envio un mensaje de error a la vista
    },
    logout: async (req, res) => {
        req.logout();
        req.session.destroy();
        res.send('Goodbye!');
    },
}
module.exports = register;