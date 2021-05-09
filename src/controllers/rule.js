const Role = require('../models/rule')

exports.createRole = async ( req, res ) => {
    try {
        const role = new Role(req.body)
        await role.save()
        res.status(201).send({
            state: true,
            message :"The user role " + req.body.ruleName + "has just been successfully created",
            data: role

        })

    }catch (e) {
        res.status(400).send({
            state: false,
            message :e.message
        })
    }
}
exports.getAllRole = async ( req, res ) => {
    try {
        const role = await Role.find()
        res.status(200).send({
            state: true,
            message: "List of all user roles",
            result: role.length,
            data: role
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message :e.message
        })
    }
}

exports.updateRole = async ( req, res ) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true })
        await role.save()
        res.status(200).send({
            state: true,
            message: "Update user role",
            data: role
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message :e.message
        })
    }
}