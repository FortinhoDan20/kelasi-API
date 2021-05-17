const express = require('express')
const { authTeacher, authUser } = require('../middlewares/auth')
const {
    createTeacher,
    login,
    teacher,
    updatePassword,
    logout,
    getAllTeacher,
    getTeacherId,
    getTeacherProgramCurrent,
    updateTeacher,
    deactivateTeacher,
    getAllTeacherDeactivate,
    activateTeacher
} = require('../controllers/teacher')

const router = new express.Router()

router.post('/add', authUser, createTeacher)
router.get('/', authUser, getAllTeacher)
router.get('/:id', authUser, getTeacherId)
router.patch('/:id', authUser, updateTeacher)
router.patch('/deactivate-teacher/:id', authUser, deactivateTeacher)
router.get('/deactivate-teacher/', authUser, getAllTeacherDeactivate)
router.patch('/activate-teacher/:id', authUser, activateTeacher)


router.post('/login', login)
router.post('/logout', authTeacher, logout)
router.get('/teacher', authTeacher, teacher)
router.patch('/password/:id', authTeacher, updatePassword)
router.patch('/teacher-update/:id', authTeacher, updateTeacher)
router.get('/teacher-program/', authTeacher, getTeacherProgramCurrent)

module.exports = router