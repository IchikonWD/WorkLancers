const mongoose = require('mongoose')

let jobsSchema = new mongoose.Schema({

    title:String,
    category:String,
    date: {
        type: Date,
        default: Date.now()
    },
    description:String,
    requirements:String,
    duration:String,
    salary:String,
    type:String,
})



module.exports = mongoose.model('Jobs', jobsSchema)