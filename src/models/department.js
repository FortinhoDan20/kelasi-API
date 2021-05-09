const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    name: String,
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    flag: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})
const Department = mongoose.model('Department', departmentSchema)
module.exports = Department