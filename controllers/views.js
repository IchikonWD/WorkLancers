//Aqui van los imports
const Jobs = require('../models/models.jobs')
const fetch = require('node-fetch')
//Empezamos los pages
const Users = require('../models/entries')
// Archivos para Scraping
const scraperTwo = require('../utils/scraperTwo')
const scraperThree = require('../utils/scraperOne')
const jsStringify  = require('js-stringify')

const pages = {
    home: async (req, res) => {
        let email = req.cookies.email;
        if(email != undefined){
            let algo = await Users.getUser_id(email)
            console.log(algo);
            res.status(200).render('home', { algo , jsStringify })
        }else{
            res.status(200).render('home')
        }
    },
    register: (req, res) => {
        res.status(200).render('register')
    },
    register2: (req, res) => {
        res.status(200).render('register2')
    },
    favorites: (req, res) => {
        res.status(200).render('favorites')
    },
    login: (req, res) => {
        res.status(200).render('login')
    },
    dashboard: async (req, res) => {
        let cookie = req.cookies.email
        let data = await Jobs.find({ email: cookie }) //Saco los trabajos por el email que viene por la cookie
        res.status(200).render('dashboard', { data })
    },
    upWork: async (req, res) => {
        try {
            if (req.body.jobTitle == ""
                || req.body.jobDescription == ""
                || req.body.jobTimer == ""
                || req.body.jobBudget == "") {
                res.status(200).redirect('dashboard')
            }
            else {
                let cookie = req.cookies.email
                console.log(req.body);
                const new_job = {
                    jobTitle: req.body.jobTitle,
                    jobDescription: req.body.jobDescription,
                    jobTimer: req.body.jobTimer,
                    jobBudget: req.body.jobBudget,
                    email: cookie //Le meto el email como id unico para unir mongo con los usuarios de SQL
                }
                let job = new Jobs(new_job)
                await job.save()
                console.log('******** JOB CREATED *********');
                res.status(200).redirect('dashboard')
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
            let id = req.body.user_id
            await Users.delete_user(id)
            await res.status(201).redirect('/users')
            console.log('Usuario borrado ');
        } catch (error) {
            console.log('Error al hacer el delete -->' + error);
        }
    },
    scraperAll: async (req, res) => {
        const searchInput = await req.body.search
        if (searchInput === undefined) {
            res.status(200).render('home')
        }
        else {
            let mongoJobs = await Jobs.find();
            let extractMongo_jobs = mongoJobs.map((param) => {
                return param;
            })
            const scrapingUno = await scraperThree(`https://www.flexjobs.com/search?jobtypes%5B%5D=Freelance&location=&search=${searchInput}`)
            const scrapingDos = await scraperTwo(`https://www.workana.com/jobs?language=es&query=${searchInput}`)
            let todoElScraping = [...scrapingUno, ...scrapingDos, ...extractMongo_jobs]
            res.status(200).json(todoElScraping)
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
            res.status(400).send('You need to LogIn first')
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
                console.log(cookie);
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
    }
}

module.exports = pages