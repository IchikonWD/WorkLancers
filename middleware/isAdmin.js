const User = require('../models/entries')

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.email) {
            let getEmail = await User.getUser_email(req.user.email)
            let email = getEmail.rows[0].email
            let tryAdmin = await User.isAdmin(email);
            if (tryAdmin === true) {
                res.cookie('email', req.user.email) //Le meto la cookie por aqui para sacar los anuncios particulares de cada admin
                next();
            } else {
                console.log('El usuario no es admin');
            }
        }
    } catch (error) {
        let msj = 'Unauthorized for this endpoint'
        req.flash('unauthorized', msj)
        res.redirect('/')
        console.log('Intentar entrar sin admin --> ' + error);
    }
}

module.exports = isAdmin;