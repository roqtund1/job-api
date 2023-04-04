
const { BadRequest, NotFound } = require('../errors');
const Job = require('../models/job');
const {StatusCodes} = require('http-status-codes')
const validate = require('../validations/validate-job')


// get all jobs
const getAllJobs = async(req, res) => {
    const { user: {userId}} = req;

    const jobs = await Job.find({createdBy: userId}).sort('-createdAt');
    
    res.json({nbHits: jobs.length, hits: jobs})
}

// get a job
const getJob = async(req, res) => {
    const { user: {userId}, params: {id: jobId}} = req;

    const job = await Job.findOne({_id: jobId, createdBy: userId}).sort('-createdat');
    if(!job) throw new NotFound(`No job with id: ${jobId}`)

    res.json(job);
}

// create job
const createJob = async(req, res) => {

    const { user: {userId}, body} = req;

    const {error} = validate(body)
    if(error){
        throw new BadRequest(error.details[0].message);
    }

    // updating req body
    body.createdBy = userId;

    const job = await Job.create(body);
    
    res.status(StatusCodes.CREATED).json(job)
}

// update job
const updateJob = async(req, res) => {

    const { user: {userId}, params: {id: jobId}, body} = req;

    // validate job
    const {error} = validate(body)
    if(error){
        throw new BadRequest(error.details[0].message);
    }

    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, body, {new: true, runValidators: true});
    if(!job) throw new NotFound(`No job with id: ${jobId}`)

    res.json(job)
}

// delete a job
const deleteJob = async(req, res) => {

    const { user: {userId}, params: {id: jobId}} = req;

    const job = await Job.findOneAndRemove({_id: jobId, createdBy: userId});
    if(!job) throw new NotFound(`No job with id: ${jobId}`)

    res.json(job)
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}