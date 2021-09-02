//Aqui van los imports




//Empezamos los pages

const pages = {
    home:(req, res) =>{
        res.status(200).render('home')
    },
    favorites: (req,res) => {
        res.status(200).render('favorites')
    }
}

module.exports = pages