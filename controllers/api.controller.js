const encrypt = require('bcryptjs')
const Users = require('../models/entries')
const Jobs = require('../models/models.jobs')

const pages = {

    postRegister: async (req, res) => {
        try {
            const response = req.body
            const { username, email, password, age, occupation, location, skills } = response
            const salt = await encrypt.genSalt(10)
            let encryptPass = await encrypt.hash(password, salt)
            try {
                let hay_email = await Users.getUser_email(email)
                console.log(hay_email)
                if (hay_email.rows.length === 0) {
                    await Users.setNew_user(username, email, encryptPass, age, occupation, location, skillsills)
                    console.log('***Register created, user on DB added***');
                    res.status(201).redirect('/')
                } else {
                    console.log('entramos *******');
                    res.status(201).redirect('/register/email')
                }
            } catch (error) {
                console.log(error);
                res.status(201).json({ error: error })
            }
            res.status(200).json({ message: response })
        } catch (error) {
            console.log("entrada");
            res.status(201).json({ error: error })
        }
    },
    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            const getbyEmail = await Users.getUser_email(email)
            if (getbyEmail.rows[0].email == email) {
                const encryptPass = getbyEmail.rows[0].password
                encrypt.compare(password, encryptPass, (err, result) => {
                    if (err) {
                        throw new Error(err)
                    }
                    if (result) {
                        return res.status(200).redirect('/')
                    } else {
                        return res.status(401).json(' Invalid password ')
                    }
                })
            }
        }
        catch (error) {
            res.status(201).json({ error: error })
        }
    },
    postLogout: async (req, res) => {
        req.logout();
        req.session.destroy();
        res.json('Goodbye!');
    },
    postFavJobs: async (req, res) => {
        try {
            console.log('Job added to favorite');
            const { title, img, description, moreInfo, user_id } = req.body
            console.log(title, img, description, moreInfo, user_id);
            await Users.insert_favJob(title, img, description, moreInfo, user_id)
            res.status(201).json(addFav)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getFavs: async (req, res) => {
        try {
            res.status(200).json()
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = pages;