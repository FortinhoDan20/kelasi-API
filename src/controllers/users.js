const moment = require('moment')
const Users = require('../models/users')
const activity = require('./activity')

exports.createUsers = async (req, res) => {
    try {
        const user = new Users(req.body)
        await user.save()
        res.status(200).send({
            state: true,
            message: req.body.identity.name + " has been created successfully",
            data: user
        })
    } catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllUsers = async ( req, res ) => {
    try {
        const users = await Users.find().populate(['rule'])
        res.status(200).send({
            state: true,
            message: "List of all users",
            result: users.length,
            data: users
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.getUserId = async ( req, res ) => {
    try {
        const user = await Users.findById(req.params.id).populate(['rule'])
        res.status(200).send({
            state: true,
            message: "details of user",
            data: user
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.updateUser = async ( req, res ) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, {...req.body, updatedAt:  moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, { new: true })
        await activity.createActivity(req.user._id,  user.identity.name +  " " + user.identity.lastName + "just updated his information ", "account update" )
        res.status(200).send({
            state: true,
            message: user.identity.name + " has been updated successfully",
            data: user
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.login = async ( req, res ) => {
    try {
        const user = await Users.findByCredentials( req.body.username, req.body.password )
        if(!user) {
            return res.status(200).send({
                state: false,
                message: "The password or username is incorrect! Please try again"
            })
        }
        const token = await user.generateAuthToken()
        await activity.createActivity(req.user._id,  user.identity.name +  " " + user.identity.lastName + "connected on the platform ", "logged in" )
        res.status(200).send({
            state: true,
            message: "Connection successfully",
            data: {
                user,
                token
            }
        })
    }catch (e) {

    }
}

exports.withdrawUser = async ( req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, { flag: false, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, { new: true }).populate(['course'])
        res.status(200).send({
            state: true,
            message: "user" + user.identity.name+ " "+ user.identity.lastName + " has just been deactivated by the admin",
            data: user
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllUserWithdraw = async ( req, res ) => {
    try {
        const user = await Users.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all user withdrawn",
            length: user.length,
            data: user
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.takeBackUser = async ( req, res ) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, { flag: true, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, {new: true})
        res.status(200).send({
            state: true,
            message: "User" + user.identity.name+ " "+ user.identity.lastName + " was taken off the user list",
            data: user
        })
    } catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }}