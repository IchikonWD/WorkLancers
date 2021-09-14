const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const User = require('../models/entries');
const encrypt = require('bcryptjs')


passport.use('login', new localStrategy  ({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.getUser_email(email)
        if(!user){
            return done(null, false, { message: 'User not found'})
        }
        const encryptPass = user.rows[0].password
        encrypt.compare(password, encryptPass, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            if (result) {
                return done(null, user, { message: 'Login successfull'})
            } else {
                return done(null, false, { message: 'User not found'})
            }
        })

    } catch (error) {
        
    }
}));
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})