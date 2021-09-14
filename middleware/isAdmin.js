const User = require('../models/entries')

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.email) {
            let getEmail = await User.getUser_email(req.user.email)
            let tryAdmin = await User.isAdmin(getEmail.rows[0].email);
            if (tryAdmin.rows[0].admin === true) {
                res.cookie('email', req.user.email) //Le meto la cookie por aqui para sacar los anuncios particulares de cada admin
                next();
            } else {
                console.log('El usuario no es admin');
                res.redirect('/')
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