//Aqui van los imports




//Empezamos los pages

const pages = {
    home:(req, res) =>{
        res.status(200).render('home')
    }
}

module.exports = pages