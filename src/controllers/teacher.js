const moment = require('moment')
const bcrypt = require('bcrypt')
const Teacher = require('../models/teacher')
const Program =require('../models/program')

const activity = require('./activity')

exports.createTeacher= async (req, res ) => {
    try {
        const teacher = new Teacher({
            ...req.body,
            createdAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
            updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
        })
        await activity.createActivity(req.user._id,  req.body.identity.name + " " + req.body.identity.lastName + " has been created by " + req.user.identity.name + " "+ req.user.identity.lastName , "teacher created" )
        await teacher.save()
        res.status(201).send({
            state: true,
            message: "Successfully created",
            data: teacher
        })
    }catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}
exports.login = async (req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.username, req.body.password)
        if (!teacher) {
            return res.status(200).send({
                state: false,
                message: "The password or username is incorrect! Please try again"
            })
        }
        await activity.teacherActivity( teacher.identity.name +  " " + teacher.identity.lastName + "connected on the platform ", "logged in"  )
        const token = await teacher.generateAuthToken()
        res.status(200).send({
            state: true,
            message: "Connection successfully",
            data: {
                teacher,
                token
            }
        })
    } catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}
exports.teacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher._id).populate(['rule'])
        res.send({
            state: true,
            message: "Teacher profile " + teacher.identity.name + " " + teacher.identity.name,
            data: teacher
        })
    } catch (e) {
        res.status(200).send({
            state: false,
            message: e.message
        })
    }
}
exports.updatePassword = async (req, res) => {
    try {

        const oldPassword = req.body.oldpassword
        const newPassword = req.body.password

        const teacher = await Teacher.findById(req.teacher.id)
        const isMatch = await bcrypt.compare(oldPassword, teacher.password)

        if (!isMatch) {
            res.status(200).send({
                state: false,
                message: "The password you entered is incorrect"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 8)
        await Teacher.findByIdAndUpdate(req.agent._id, { password: hashedPassword }, { new: true })

        await activity.teacherActivity(teacher.identity.name +  " " + teacher.identity.lastName +  "has updated his password",  "password updated",  )
        res.status(200).send({
            state: true,
            message: "Your password has been updated successfully"
        })

    } catch (e) {
        res.status(200).send({
            state: false,
            message: e.message
        })
    }
}
exports.logout = async (req, res) => {
    try {
        const agent = req.agent
        agent.tokens = []

        await activity.teacherActivity( "loggedOut",  agent.identity.name + "se déconnectait de la plate-forme ")
        await agent.save()
        res.status(200).send({
            state: true,
            message: "You have successfully logged out"
        })
    } catch (e) {
        res.status(400).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllTeacher= async ( req, res ) => {
    try {
        const teacher = await Teacher.find({ flag: true }).populate([ 'promotion', 'course', 'teacher' ])
        res.status(200).send({
            state: true,
            message:"List of all academic program",
            length: teacher.length,
            data: teacher
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message,
        })
    }
}
exports.getTeacherId = async ( req, res ) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
        res.status(200).send({
            state: true,
            message: "Teacher detail",
            data: teacher
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.getTeacherProgramCurrent = async ( req, res ) => {
    try {
        const lastYear = moment().format('YYYY') - 1
        const currentYear = moment().format('YYYY')
        const academicYear = lastYear + " - " + currentYear

        const program = await Program.find({ teacher: req.teacher._id,academicYear: academicYear,  flag: true }).populate(['course', 'promotion'])
        res.status(200).send({
            state:true,
            message:"Current course program",
            length: program.length,
            data: program
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.updateTeacher = async ( req, res ) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a')}, { new: true }).populate(['course'])
        await activity.teacherActivity("Teacher" + teacher.identity.name + " "+ teacher.identity.lastName + " has been updated by " + req.user.identity.name + " "+ req.user.identity.lastName , "teacher updated" )
        res.status(200).send({
            state: true,
            message: teacher.identity.name + "has been updated",
            data: teacher
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}

exports.deactivateTeacher = async ( req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, { flag: false, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, { new: true }).populate(['course'])
        await activity.teacherActivity( "Teacher" + teacher.identity.name +  " "+ teacher.identity.lastName + " has been withdraw by " + req.user.identity.name + " "+ req.user.identity.lastName ,  " teacher withdraw" )
        res.status(200).send({
            state: true,
            message: "Teacher" + teacher.identity.name+ " "+ teacher.identity.lastName + " has been deactivated from the teacher list",
            data: teacher
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.getAllTeacherDeactivate = async ( req, res ) => {
    try {
        const teacher = await Teacher.find({ flag: false })
        res.status(200).send({
            state: true,
            message: "list of all teacher withdrawn",
            length: teacher.length,
            data: teacher
        })
    }catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }
}
exports.activateTeacher = async ( req, res ) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, { flag: true, updatedAt: moment().format('dddd MMMM Do YYYY, h:mm:ss a') }, {new: true})
        await activity.teacherActivity("Teacher" + teacher.identity.name +  " " + teacher.identity.lastName + " has been take back by " + req.user.identity.name + " " + req.user.identity.lastName, "teacher take back")
        res.status(200).send({
            state: true,
            message: "Teacher" + teacher.identity.name+ " "+ teacher.identity.lastName + " was taken off the teacher list",
            data: teacher
        })
    } catch (e) {
        res.status(500).send({
            state: false,
            message: e.message
        })
    }}


