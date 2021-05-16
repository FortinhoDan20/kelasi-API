const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const teacherSchema = mongoose.Schema({
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

teacherSchema.pre("save", async function (next) {
    const teacher = this
    if (teacher.isModified("password")) {
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }
    next()
})
teacherSchema.methods.toJSON = function () {
    const teacher = this
    const teacherObject = teacher.toObject()

    delete teacherObject.password
    delete teacherObject.tokens

    return teacherObject
}
teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this
    const token = jwt.sign({_id: teacher._id.toString()}, process.env.SECRET_JWT)

    teacher.tokens = teacher.tokens.concat({token})
    await teacher.save()
    return token
}
teacherSchema.statics.findByCredentials = async (userrname, password) => {
    const teacher = await Teacher.findOne({userrname}).populate(["rule"])

    if (!teacher) {
        throw new Error("Unable to login check your password or your username")
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
        throw new Error("Unable to login check your password or your email")
    }
    const teacherActivated = await Teacher.findOne({flag: true})

    if (!teacherActivated) {
        throw  new Error("unable to log in your account is disabled")
    }
    return teacher
}

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher