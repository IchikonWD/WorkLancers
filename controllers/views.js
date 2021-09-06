//Aqui van los imports
const Jobs = require('../models/models.jobs')
const fetch = require('node-fetch')

//Empezamos los pages

const pages = {
    home:(req, res) =>{
        res.status(200).render('home')
    },
    register:(req,res) => {
        res.status(200).render('register')
    },
    favorites: (req,res) => {
        res.status(200).render('favorites')
    },
    login:(req, res) =>{
        res.status(200).render('login')
    },
    dashboard: async (req, res) => {
        await fetch('http://localhost:3000/api/ads')
            .then(res => res.json())
            .then(payload => console.log(payload))
        // res.status(200).render('dashboard')
     },
    upWork: async(req,res)=>{
        try {
            if(req.method == 'GET'){
                res.status(200).render('dashboard')
            }
            if(req.method == 'POST'){
                if(req.body.createJob != undefined){
                    // let showForm = 1
                    res.status(200).render('dashboard')
                }
                if(req.body.title != undefined){
                    let job = new Jobs(req.body)
                    const new_job = await job.save()
                    console.log(new_job);
                    let jobs = await Jobs.find()
                    let data = [new_job, {
                        "jobs_before": jobs,
                    }]
                    console.log('******** JOB CREATED *********');
                    res.status(200).render('dashboard')
                }
            }
        } catch (error) {
            res.status(400).send('A error has ocurred' + error)
        }
    }
}

module.exports = pages