const jwt = require('jsonwebtoken')
const Users = require('../models/users')
const Teacher = require('../models/teacher')
//const Student = require('../models/student')


exports.authUser = async  (req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const user = await Users.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.user = user

        next()

    }catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
exports.authTeacher = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const teacher = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.teacher = teacher

        next()

    }catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

/*exports.authStudent = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!student) {
            throw new Error()
        }
        req.token = token
        req.student = student

        next()

    }catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

 */