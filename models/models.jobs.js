const mongoose = require('mongoose')

let jobsSchema = new mongoose.Schema({

    tittle:String,
    Category:String,
    Date:String,
    Description:String,
    Requirements:String,
    Duration:String,
    Salary:String,
    Type:String,
})



module.exports = mongoose.model('Jobs', jobsSchema)