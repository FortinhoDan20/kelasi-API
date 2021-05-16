const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
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