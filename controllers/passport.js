const db = require('../utils/sql-db')

const passport = {
    register: async(req,res) => {
        try {
            const { username, email, password, age, occupation, location, skills} = req.body;
            const { rows } = await db.query(
                "INSERT INTO users (username, email, password, age, occupation, location, skills) VALUES ($1, $2, $3, $4 ,$5, $6, $7)",
                [username, email, password, age, occupation, location, skills]
            );
            res.status(201).send({
                message: "User added successfully!",
                body: {
                    user: { username, email, password, age, occupation, location, skills }
                }
            })
        } catch (error) {
            res.status(200).send("Ha ocurrido un error" + error)
        }
    }
}

module.exports = passport; 

/*
exports.createProduct = async (req, res) => {
    const { product_name, quantity, price } = req.body;
    const { rows } = await db.query(
      "INSERT INTO products (product_name, quantity, price) VALUES ($1, $2, $3)",
      [product_name, quantity, price]
    );
  
    res.status(201).send({
      message: "Product added successfully!",
      body: {
        product: { product_name, quantity, price }
      },
    });
  };
  */