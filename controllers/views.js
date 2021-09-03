//Aqui van los imports




//Empezamos los pages

const pages = {
    home:(req, res) =>{
        res.status(200).render('home')
    },
    login:(req, res) =>{
        res.status(200).render('login')
    },
}

module.exports = pages