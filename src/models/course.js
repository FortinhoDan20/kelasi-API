const mongoose = require('mongoose')
const moment = require('moment')
const courseSchema = mongoose.Schema({
    name: String,
    volume: {
        hours: String,
        value: Number
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Promotion'
    },
     flag: {
        type:Boolean,
         default: true
     },
    createdAt: {
        type: Date,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    updatedAt:{
        type: Date,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    }
})
const Course = mongoose.model(('Course', courseSchema))
module.exports = Course