const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    flag: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})
const Faculty = mongoose.model('Faculty', facultySchema)
module.exports = Faculty