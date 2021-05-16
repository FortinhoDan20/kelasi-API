const mongoose = require('mongoose')
const moment = require('moment')

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    comment: String,
    status: String,
    createdAt: {
        type: Date,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    }
})
const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity