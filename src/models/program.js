const mongoose = require('mongoose')

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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    academicYear: String,
},{
    timestamps: true
})
const Program = mongoose.model('Program', programSchema)
module.exports = Program