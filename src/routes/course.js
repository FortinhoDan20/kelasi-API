const express = require('express')
const {authUser} = require('../middlewares/auth')
const {
    createCours,
    getAllCourse,
    updateCourse,
    deactivatedCourse,
    getAllRemove,
    activatedCourse
} = require('../controllers/course')

const router = new express.Router()

router.post('/add', authUser, createCours)

router.get('/', authUser, getAllCourse)

router.patch('/:id', authUser, updateCourse)

router.get('/deactivate-course/', authUser, getAllRemove)

router.patch('/deactivate-course/:id', authUser, deactivatedCourse)

router.patch('/activate-course/:id', authUser, activatedCourse)

module.exports = router