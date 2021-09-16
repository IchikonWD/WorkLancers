const Users = require('../models/entries')
const encrypt = require('bcryptjs')
const { auth_schema } = require('../middleware/regex_mid')

const register = {
    register: async (req, res) => {
        try {
            const result = await auth_schema.validateAsync(req.body)
            const { username, email, password, age, occupation, location, skills } = result;
            const salt = await encrypt.genSalt(10)
            let encryptPass = await encrypt.hash(password, salt)
            console.log(encryptPass);
            try { //Pruebo que no exista el email primero para que no se mezcle con los creados con Google
                let user_email = await Users.getUser_email(email)
                if (user_email.rows.length === 0) { 
                    await Users.setNew_user(username, email, encryptPass, age, occupation, location, skills)
                    res.cookie('email', email)
                    console.log('***Register created, user on DB added***');
                    res.status(201).redirect('/')
                }else{ //Aqui faltaria enviarle un mensaje de error para sacarlo en el pug, pero me da problemas el .render()
                    console.log('Email Repetido');
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
    fail: async (req, res) => {
        let errMsj = 'The email already exist or something went wrong' 
        req.flash('fail_login', errMsj) 
        res.status(200).redirect('/login')
        //En caso de fail le redirijo a login y le envio un mensaje de error a la vista
    },
    logout: async (req, res) => {
        req.logout();
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
    },
}
module.exports = register;





