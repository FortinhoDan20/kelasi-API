const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    identity: {
        name: String,
        lastName: String
    },
    contacts: {
        phone: {
            type: String,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error("Phone number invalid");
                }
            },
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
    },
    address: {
        number: Number,
        street: String,
        commune: String,
        town: String
    },
    username: String,
    rule: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Rule",
    },
    password: {
        type: String,
        required: true,
    },
    flag: {
        type: Boolean,
        default: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_JWT)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await Users.findOne({username}).populate(["rule"])

    if (!user) {
        throw new Error("Unable to login check your password or your username")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login check your password or your email")
    }
    return user
}
const Users = mongoose.model('Users', userSchema)
module.exports = Users