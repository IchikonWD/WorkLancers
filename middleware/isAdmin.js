const User = require('../models/entries')

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.email || req.user.rows[0].email) {
            try {
                console.log('Entramos');
                let getEmail = await User.getUser_email(req.user.email || req.user.rows[0].email)
                let email = getEmail.rows[0].email
                let tryAdmin = await User.isAdmin(email);
                if (tryAdmin === true) {
                    res.cookie('email', req.user.email) //Le meto la cookie por aqui para sacar los anuncios particulares de cada admin
                    next();
                } else {
                    console.log('El usuario no es admin');
                    let notAdmin = 'You need to be an administrator'
                    req.flash('unauthorized', notAdmin)
                    res.status(200).redirect('/')
                }
            } catch (error) {
                console.log(error);
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