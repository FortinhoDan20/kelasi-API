const mongoose = require('mongoose')
const moment = require('moment')
const courseSchema = mongoose.Schema({
    name: String,
    volume: {
        hours: {
            type: String,
            default: 'h'
        },
        value: Number
    },
    coefficient: Number,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    createdAt: {
        type: String,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    updatedAt:{
        type: String,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    flag: {
        type:Boolean,
         default: true
     },
})
const Course = mongoose.model('Course', courseSchema)
module.exports = Course