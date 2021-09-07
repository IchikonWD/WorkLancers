const passport = require('passport')
const LocalStrategy = require('passport-local')

passport.use('local-signup', new LocalStrategy({
    email: 'email',
    password: 'password',
    passReqToCallBack: true
}, (req, email, password, done) => {

}))