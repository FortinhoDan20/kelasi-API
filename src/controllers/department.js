const moment = require('moment')
const Department = require('../models/department')
const activity = require('./activity')

exports.createDepartment = async (req, res ) => {
    try {
        const department = new Department({
            ...req.body,
            user: req.user._id
        })
        await activity.createActivity(req.user._id,  req.body.name + " has been created by " + req.user.identity.name + " "+ req.user.identity.lastName , "department created" )
        await department.save()
        res.status(201).send({
            state: true,
            message: req.body.name + "has been successfully created",
            data: department
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.getAllDepartment = async ( req, res ) => {
    try {
        const department = await Department.find({ flag: true }).populate([ 'faculty' ])
        res.status(200).send({
            state: true,
            message:"List of all department",
            length: department.length,
            data: department
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message,
        })
    }
}
exports.updateDepartment= async ( req, res ) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a')}, { new: true })
        await activity.createActivity(req.user._id,  department.name + " has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "department updated" )
        res.status(200).send({
            state: true,
            message: department.name + " has been updated",
            data: department
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.withdrawPromotion = async ( req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, { flag: false, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, { new: true })
        await activity.createActivity(req.user._id,  department.name + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName , "department withdraw" )
        res.status(200).send({
            state: true,
            message: department.name + " has been deactivated from the department list",
            data: department
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllDepartment = async ( req, res ) => {
    try {
        const department = await Department.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all department withdrawn",
            length: department.length,
            data: department
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.takeBackDepartment = async ( req, res ) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, { flag: true, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, {new: true})
        await activity.createActivity(req.user._id, department.name + " has been take back by " + req.user.identity.name + " " + req.user.identity.lastName, "department take back")
        res.status(200).send({
            state: true,
            message: department.name + " was taken off the department list",
            data: department
        })
    } catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}