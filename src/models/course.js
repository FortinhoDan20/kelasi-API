const mongoose = require('mongoose')

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
    promotion: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Promotion'
    },
     flag: {
        type:Boolean,
         default: true
     }
}, {
    timestamps: true
})
const Course = mongoose.model(('Course', courseSchema))
module.exports = Course