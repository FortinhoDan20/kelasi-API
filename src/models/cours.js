const mongoose = require('mongoose')

const coursSchema = mongoose.Schema({
    name: String,
    volume: {
        hours: String,
        value: Number
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
     flag: {
        type:Boolean,
         default: true
     }
}, {
    timestamps: true
})
const Cours = mongoose.model(('Cours', coursSchema))
module.exports = Cours