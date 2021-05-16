const express = require('express')
const { authUser } = require('../middlewares/auth')
const {createFaculty, getAllFaculty, updateFaculty, deactivatedFaculty, getAllDeactivate } = require('../controllers/faculty')

const router = new express.Router()

router.post('/add', authUser, createFaculty)

module.exports = router
