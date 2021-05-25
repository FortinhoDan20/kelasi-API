const mongoose = require('mongoose')

const promotionSchema = mongoose.Schema({
    name: String,
    short: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
}, {
    timestamps: true
})
const Promotion = mongoose.model('Promotion', promotionSchema)
module.exports = Promotion