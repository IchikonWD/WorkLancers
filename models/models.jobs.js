const mongoose = require('mongoose')

let jobsSchema = new mongoose.Schema({

    tittle:String,
    category:String,
    date:String,
    description:String,
    requirements:String,
    duration:String,
    salary:String,
    type:String,
})



module.exports = mongoose.model('Jobs', jobsSchema)