const { string } = require('joi')
const mongoose = require('mongoose')

let jobsSchema = new mongoose.Schema({

    title:String,
    description:String,
    moreinfo:String,
    url: String,
    email:String,
})



module.exports = mongoose.model('Jobs', jobsSchema)