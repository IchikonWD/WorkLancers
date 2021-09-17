//Aqui van los imports
const Jobs = require('../models/models.jobs')
//Empezamos los pages
const Users = require('../models/entries')
// Archivos para Scraping
const scraperTwo = require('../utils/scraperTwo')
const scraperThree = require('../utils/scraperOne')
const jsStringify = require('js-stringify')

const pages = {
    home: async (req, res) => {
        try {
            let email = req.cookies.email;
            if (email != undefined) {
                let user = await Users.getUser_id(email)
                let tryAdmin = await Users.isAdmin(email)
                res.status(200).render('home', { user, jsStringify, tryAdmin, email })
            } else {
                res.status(200).render('home', { email })
            }
        } catch (error) {
            res.status(400).redirect('/login')
        }
    },
    register: (req, res) => {
        res.status(200).render('register')
    },
    register2: (req, res) => {
        res.status(200).render('register2')
    },
    favorites: async (req, res) => {
        try {
            let cookies = req.cookies.email
            let id = await Users.getUser_id(cookies);
            let data = await Users.getFav_jobs(id)
            console.log(data);
            res.status(200).render('favorites', { data })
        } catch (error) {
            res.status(400).redirect('login')
        }
    },
    login: (req, res) => {
        let logError = req.flash('error')
        res.status(200).render('login', { logError })
    },
    dashboard: async (req, res) => {
        try {
            let cookie = req.cookies.email
            let data = await Jobs.find({ email: cookie }) //Saco los trabajos por el email que viene por la cookie
            res.status(200).render('dashboard', { data })
        } catch (error) {
            console.log('Ha ocurrido un error en el dashborad -->  ' + error);
            res.status(400).redirect('/')
        }
    },
    upWork: async (req, res, next) => {
        try {
            if (req.body.jobTitle == ""
                || req.body.jobDescription == ""
                || req.body.jobTimer == ""
                || req.body.jobBudget == "") {
                res.status(200).redirect('dashboard')
            }
            else {
                let cookie = req.cookies.email
                if (req.body.idMong_job === 'NO') {
                    console.log('No entra');
                    const new_job = {
                        title: req.body.jobTitle,
                        description: req.body.jobDescription,
                        moreinfo: req.body.jobBudget,
                        url: req.body.url,
                        email: cookie //Le meto el email como id unico para unir mongo con los usuarios de SQL
                    }
                    let job = new Jobs(new_job)
                    await job.save()
                    console.log('******** JOB CREATED *********');
                    res.status(200).redirect('dashboard')
                } else {
                    next();
                }
            }
        } catch (error) {
            res.status(400).send('A error has ocurred' + error)
        }
    },
    users: async (req, res) => {
        try {
            const result = await Users.getInfo_allUsers()
            let hola = result.rows
            res.status(200).render('users', { hola })
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.body.email
            await Users.delete_user(id)
            await res.status(201).redirect('/users')
            console.log('Usuario borrado ');
        } catch (error) {
            console.log('Error al hacer el delete -->' + error);
        }
    },
    scraperAll: async (req, res) => {
        try {
            const searchInput = await req.body.search
            if (searchInput === undefined) {
                res.status(200).render('home')
            }
            else {
                // let mongoJobs = await Jobs.find();
                // let extractMongo_jobs = mongoJobs.map((param) => {
                //     return param;
                // })
                const scrapingUno = await scraperThree(`https://www.flexjobs.com/search?jobtypes%5B%5D=Freelance&location=&search=${searchInput}`)
                const scrapingDos = await scraperTwo(`https://www.workana.com/jobs?language=es&query=${searchInput}`)
                let todoElScraping = [...scrapingUno, ...scrapingDos/*, ...extractMongo_jobs*/]
                res.status(200).json(todoElScraping)
            }
        } catch (error) {
            console.log('Ha ocurrido un error al hacer el scraping --->  ' + error);
        }
    },
    profile: async (req, res) => {
        try {
            let cookie = req.cookies.email
            Users.getInfo_byEmail(cookie)
                .then(data => {
                    let user = data.rows[0];
                    res.status(200).render('profile', { user })
                })
        } catch (error) {
            res.status(400).redirect('/login')
        }
    },
    editUser: async (req, res) => {
        try {
            if (req.body.username == ""
                || req.body.age == ""
                || req.body.occupation == ""
                || req.body.location == ""
                || req.body.skills == ""
                || req.body.image == "") {
                res.status(200).redirect('profile')
            }
            else {
                let cookie = req.cookies.email
                let username = req.body.username
                let age = req.body.age
                let occupation = req.body.occupation
                let location = req.body.location
                let skills = req.body.skills
                let image = req.body.image
                await Users.update_user(cookie, username, age, occupation, location, skills, image)
                console.log('*** Profile Updated ***');
                res.status(200).redirect('profile')
            }
        } catch (error) {
            res.status(400).send('A error has ocurred --> ' + error)
        }
    },
    deleteFavJob: async (req, res) => {
        try {
            let id = req.body.job_id
            await Users.delete_favJob(id)
            await res.status(201).redirect('/favorites')
            console.log('Trabajo borrado ');
        } catch (error) {
            console.log('Error al hacer el delete -->' + error);
        }
    },
    deleteJobMongo: async (req, res) => {
        try {
            if (req.body.idMong_job != 'NO') {
                let id = req.body.idMongo_job
                await Jobs.findByIdAndDelete({ _id: id})
                res.status(201).redirect('/dashboard')
            }
        } catch (error) {
            console.log(error);
            res.status(400).redirect('/dashboard')
        }
    }
}

module.exports = pages