const Faculty = require('../models/faculty')
const activity = require('./activity')

exports.createFaculty = async ( req, res ) => {
    try{
        const faculty = new Faculty({...req.body, user:req.user._id })
        await activity.createActivity(req.user._id, req.body.name + " was created by " + req.user.identity.name + " "+ req.user.identity.lastName , "new faculty created" )
        await faculty.save()
        res.status(201).send({
            state: true,
            message: req.body.name + " was successfully created",
            data: activity
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.getAllFaculty = async ( req, res ) => {
    try {
        const faculty = await Faculty.find( { flag: true })
        res.status(200).send({
            state: true,
            message: "List of all faculties",
            length: faculty.length,
            data: faculty
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.updateFaculty = async ( req, res ) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true })
        await activity.createActivity(req.user._id,  faculty.name + " has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "faculty updated" )
        res.status(200).send({
            state: true,
            message: faculty.name + " has been updated",
            data: faculty
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.deactivatedFaculty = async ( req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, { flag: false }, { new: true })
        await activity.createActivity(req.user._id,  faculty.name + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName , "faculty withdraw" )
        res.status(200).send({
            state: true,
            message: faculty.name + " has been deactivated from the faculty list",
            data: faculty
        })
    }catch (e) {

    }
}
exports.getAllDeactivate = async ( req, res ) => {
    try {
        const faculty = await Faculty.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all faculties withdrawn",
            length: faculty.length,
            data: faculty
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.takeBackFaculty = async ( req, res ) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, { flag: true }, { new: true })
        await activity.createActivity(req.user._id,  faculty.name + " has been take back by " + req.user.identity.name + " "+ req.user.identity.lastName , "faculty take back" )
        res.status(200).send({
            state: true,
            message: faculty.name + " was taken off the faculty list",
            data: faculty
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
