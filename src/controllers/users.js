const Users = require('../models/users')

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
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
exports. deleteUser = async ( req, res ) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id)
        if (!user ) {
            res.status(400).send({
                state: false,
                message: "The user is not found...."
            })
        }
        res.status(200).send({
            state: true,
            message: user.identity.name + "has been deleted successfully"
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}