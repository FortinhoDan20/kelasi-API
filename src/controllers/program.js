const moment = require('moment')
const Program = require('../models/program')
const activity = require('./activity')

exports.createProgram = async (req, res ) => {
    try {
        const lastYear = moment().format('YYYY') - 1
        const currentYear = moment().format('YYYY')
        const academicYear = lastYear + " - " + currentYear
        const program = new Program({
            ...req.body,
            academicYear: academicYear,
            user: req.user._id,
            createdAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
            updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
        })
        await activity.createActivity(req.user._id,  req.body.name + " has been created by " + req.user.identity.name + " "+ req.user.identity.lastName , "programme created" )
        await program.save()
        res.status(201).send({
            state: true,
            message: "Successfully created",
            data: program
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.getAllProgram = async ( req, res ) => {
    try {
        const faculty = req.body.faculty
        const promotion = req.body.promotion

        const program = await Program.find({faculty: faculty, promotion: promotion, flag: true }).populate([ 'promotion', 'course', 'teacher' ])
        res.status(200).send({
            state: true,
            message:"List of all academic program",
            length: program.length,
            data: program
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message,
        })
    }
}

exports.updateProgram = async ( req, res ) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a')}, { new: true }).populate(['course'])
        await activity.createActivity(req.user._id,  "The" + program.course.name + " course program has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "The" + program.course.name + " course program has been updated" )
        res.status(200).send({
            state: true,
            message: program.course.name + " course program has been updated",
            data: program
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.deactivateProgram = async ( req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, { flag: false, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, { new: true }).populate(['course'])
        await activity.createActivity(req.user._id,  "The" + program.course.name + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName , "The" + program.course.name + " course program withdraw" )
        res.status(200).send({
            state: true,
            message: "The course" + program.course.name + " has been deactivated from the course program",
            data: program
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllProgramDeactivate = async ( req, res ) => {
    try {
        const program = await Program.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all department withdrawn",
            length: program.length,
            data: program
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.activateProgram = async ( req, res ) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, { flag: true, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, {new: true})
        await activity.createActivity(req.user._id, program.name + " has been take back by " + req.user.identity.name + " " + req.user.identity.lastName, "department take back")
        res.status(200).send({
            state: true,
            message: "The course" + program.course.name +  " was taken off the course program",
            data: program
        })
    } catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}