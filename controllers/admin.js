const Jobs = require('../models/models.jobs')

const admin = {
    myJobs: async(req, res) => {
        let jobs
        jobs = await Jobs.find()
        let select = jobs.map((param) => {
            return param
        })
            res.status(200).json(select)
    }
}

module.exports = admin