const express = require('express')
const { authUser } = require('../middlewares/auth')
const {createFaculty, getAllFaculty, updateFaculty, deactivatedFaculty, getAllDeactivate } = require('../controllers/faculty')

const router = new express.Router()

router.post('/add', authUser, createFaculty)

router.get('/', authUser, getAllFaculty)

router.patch('/:id', authUser, updateFaculty)

router.patch('/deactivate-faculty/:id', authUser, deactivatedFaculty)

router.get('/deactivate-faculty/', authUser, getAllDeactivate)

module.exports = router
