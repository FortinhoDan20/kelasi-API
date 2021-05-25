const Course = require('../models/course')
const activity = require('./activity')

exports.createCourse = async ( req, res ) => {
    try {
        const course = new Course({...req.body, user:req.user._id })
        await course.save()
        await activity.createActivity(req.user._id,  req.body.name +  "  has been created by " + req.user.identity.name + " "+ req.user.identity.lastName , "course created" )
        res.status(201).send({
            state: true,
            message: req.body.name + "has been successfully created",
            data: course
        })
    }
    catch (e) {
        res.status(400).send({
            state: false,
            message: e.message,
        })
    }
}
exports.getAllCourse = async ( req, res ) => {
    try {
        const faculty = req.body.faculty
        const promotion = req.body.promotion

        const course = await Course.find({ faculty:faculty, promotion:promotion, flag: true }).populate([ 'faculty', 'promotion'])
        res.status(200).send({
            state: true,
            message:"List of all course",
            length: course.length,
            data: course
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message,
        })
    }
}
exports.updateCourse = async ( req, res ) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        await activity.createActivity(req.user._id,  course.name + " has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "course updated" )
        res.status(200).send({
            state: true,
            message: course.name + " has been updated",
            data: course
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.deactivatedCourse = async ( req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { flag: false }, { new: true })
        await activity.createActivity(req.user._id,  course.name + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName , "course withdraw" )
        res.status(200).send({
            state: true,
            message: course.name + " has been deactivated from the course list",
            data: course
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllRemove = async ( req, res ) => {
    try {
        const course = await Course.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all courses withdrawn",
            length: course.length,
            data: course
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.activatedCourse = async ( req, res ) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { flag: true }, { new: true })
        await activity.createActivity(req.user._id,  course.name + " has been take back by " + req.user.identity.name + " "+ req.user.identity.lastName , "course take back" )
        res.status(200).send({
            state: true,
            message: course.name + " was taken off the faculty list",
            data: course
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}