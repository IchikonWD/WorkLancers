const db = require('../utils/sql-db')

const passport = {
    register: async(req,res) => {
        try {
            const { email,username, password, age, occupation, location, skills} = req.body;
            console.log(req.body);
            const { rows } = await db.query(
                "INSERT INTO users (username, email, password, age, occupation, location, skills) VALUES ($1, $2, $3, $4 ,$5, $6, $7)",
                [username, email, password, age, occupation, location, skills]
            );
            console.log('***Register created, user on DB added***');
            res.status(201).redirect('/')
        } catch (error) {
            res.status(200).send("Ha ocurrido un error" + error)
        }
    }
}
module.exports = passport;