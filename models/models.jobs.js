const mongoose = require('mongoose')

let jobsSchema = new mongoose.Schema({

    jobTitle:String,
    jobDescription:String,
    jobTimer:String,
    jobBudget:String,
    email:String,
})



module.exports = mongoose.model('Jobs', jobsSchema)