const mongoose = require('mongoose')
const moment = require('moment')
const ruleSchema = mongoose.Schema({
    ruleName: String,
    flag: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    },
    updatedAt:{
        type: String,
        default: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
    }
})

const Rule = mongoose.model('Rule', ruleSchema)
module.exports = Rule