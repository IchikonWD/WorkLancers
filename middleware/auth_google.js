const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Users = require('../models/entries')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL, //La callback URL deberia llevar a la vista del perfil para que el usuario complete su perfil
                                                 // Porque con el registro en google mete muchos campos vacios en la BBDD
    passReqToCallback: true
},
    async function (req, accessToken, refreshToken, profile, done) {
        // console.log(profile._json); --> De aqui sacamos la informacion de los usuarios y la metemos a la DB
        // User.findOrCreate({ googleId: profile.id }, function (err, user) { //Aqui deberias encontrar al usuario en SQL
        try {
            let exist_user = await Users.getUser_email(profile._json.email)
            if(exist_user.rows.length === 0 ){
                let newUser = await Users.setNewGoogle_user(profile._json.name, profile._json.email, profile._json.sub, profile._json.locale, profile._json.picture) // Por aqui meto el usuario de google en SQL 
                if(newUser != undefined ){
                    return done(null, newUser, profile);
                }else{
                    req.flash('error')
                }
            }else{
                console.log('EL usuario ya existe ************');
                return done(null, profile)
            }
        } catch (error) {
            console.log(error);
        }
    }
));
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})