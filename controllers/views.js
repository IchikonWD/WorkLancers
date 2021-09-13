//Aqui van los imports
const Jobs = require('../models/models.jobs')
const fetch = require('node-fetch')
//Empezamos los pages
const Users = require('../models/entries')
// Archivos para Scraping
const scraperOne = require('../utils/scraperOne')
const scraperTwo = require('../utils/scraperTwo')

const pages = {
    home: (req, res) => {
        res.status(200).render('home')
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
        let response = await fetch('http://localhost:3000/api/ads')
        let data = await response.json()
        res.status(200).render('dashboard', { data })
    },
    upWork: async (req, res) => {
        try {
            if (req.body.title == ""
                || req.body.category == ""
                || req.body.description == ""
                || req.body.requirements == ""
                || req.body.duration == ""
                || req.body.salary === '') {
                res.status(200).redirect('dashboard')
            }
            else {
                let job = new Jobs(req.body)
                const new_job = await job.save()
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
            res.status(200).render('users', {hola})
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.body.user_id
            await Users.delete_user(id)
            await res.status(201).redirect('/users')
            console.log('Usuario borrado ');
        } catch (error) {
            console.log('Error al hacer el delete -->' + error);
        }
    },
     scraperAll : async (req, res) => {

        //  const scrapingUno = await scraperOne('https://www.freelancer.es/jobs/?keyword=developer#')
        //  const scrapingDos = await scraperTwo('https://www.workana.com/jobs?category=it-programming&language=es')

       

        // let todoElScraping = [...scrapingUno, ...scrapingDos]

        //  res.status(200).json(todoElScraping)
     },
    
}

module.exports = pages