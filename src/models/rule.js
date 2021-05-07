const mongoose = require('mongoose')

const ruleSchema = mongoose.Schema({
    ruleName: String,
    flag: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Rule = mongoose.model('Rule', ruleSchema)
module.exports = Rule