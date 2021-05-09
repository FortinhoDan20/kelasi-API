const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    name: String,
    flag: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})
const Faculty = mongoose.model('Faculty', facultySchema)
module.exports = Faculty