const mongoose = require('mongoose')

const promotionSchema = mongoose.Schema({
    name: String,
    slug: String,
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
}, {
    timestamps: true
})
const Promotion = mongoose.model('Promotion', promotionSchema)
module.exports = Promotion