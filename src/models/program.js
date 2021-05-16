const mongoose = require('mongoose')
const moment = require('moment')

const programSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Promotion'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    academicYear: String,
    createdAt: {
        type: Date,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    updatedAt:{
        type: Date,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    flag: {
        type: Boolean,
        default: true
    }
})
const Program = mongoose.model('Program', programSchema)
module.exports = Program