const Promotion = require('../models/promotion')
const activity = require('./activity')

exports.createPromotion = async (req, res ) => {
    try {
        const promotion = new Promotion(req.body)
        await activity.createActivity(req.user._id,  req.body.name + " has been created by " + req.user.identity.name + " "+ req.user.identity.lastName , "promotion created" )
        await promotion.save()
        res.status(201).send({
            state: true,
            message: req.body.name + "has been successfully created",
            data: promotion
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}

exports.getAllPromotion = async ( req, res ) => {
    try {
        const promotion = await Promotion.find({ flag: true }).populate([ 'faculty' ])
        res.status(200).send({
            state: true,
            message:"List of all promotion",
            length: promotion.length,
            data: promotion
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message,
        })
    }
}
exports.updatePromotion = async ( req, res ) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true })
        await activity.createActivity(req.user._id,  promotion.name + " has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "promotion updated" )
        res.status(200).send({
            state: true,
            message: promotion.name + " has been updated",
            data: promotion
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
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, { flag: false }, { new: true })
        await activity.createActivity(req.user._id,  promotion.name + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName , "promotion withdraw" )
        res.status(200).send({
            state: true,
            message: promotion.name + " has been deactivated from the promotion list",
            data: promotion
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
        const promotion = await Promotion.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all promotion withdrawn",
            length: promotion.length,
            data: promotion
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.takeBackPromotion = async ( req, res ) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, {flag: true}, {new: true})
        await activity.createActivity(req.user._id, promotion.name + " has been take back by " + req.user.identity.name + " " + req.user.identity.lastName, "promotion take back")
        res.status(200).send({
            state: true,
            message: promotion.name + " was taken off the promotion list",
            data: promotion
        })
    } catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}