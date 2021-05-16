const Activity = require('../models/activity')

module.exports.createActivity = async ( user, comment, status) => {

    try {
        const activity = new Activity({ user: user, comment : comment , status: status })
        await activity.save()

    }catch (e) {
        console.log(e.message)
    }

}

module.exports.teacherActivity = async ( comment, status ) => {
    try {
        const activity = new Activity ( { comment: comment, status: status })
        await activity.save()
    }catch (e) {
        console.log(e.message)
    }

}
exports.getActivity = async (req, res) => {
    try {
        const activity = await Activity.find({ agent: req.agent._id, }).populate(['agent'])
        res.status(200).send({
            state: true,
            message: "Your activity",
            data: activity
        })
    }catch (e) {
        res.status(200).send({
            state: false,
            message: e.message
        })
    }
}