const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const db = require('../utils/sql-db')


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //Comprobamos si existe el correo del usuario
    const user_email = await db.query(`SELECT email FROM users WHERE email='${email}'`)
    if (!user_email) {
        return done(null, false, { message: 'Not email found' })
    } else {
        //Validamos si existe la contraseña 
        const user_pass = await db.query(`SELECT email FROM users WHERE email='${password}'`)
        if (user_pass) {
            return done(null, user_email)
        } else {
            return done(null, false, { message: 'Incorrect Password! '})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id)
})

passport.deserializeUser((id, done) => {
    db.query(`SELECT email FROM users WHERE user_id='${id}'`, (err, user) => {
        done(err, user)
    }) 
})
