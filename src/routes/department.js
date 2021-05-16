const express = require('express')
const {authUser} = require('../middlewares/auth')
const {
    createDepartment,
    getAllDepartment,
    updateDepartment,
    deactivatePromotion,
    activateDepartment
} = require('../controllers/department')

const router = new express.Router()

router.post('/add', authUser, createDepartment)

router.get('/', authUser, getAllDepartment)

router.patch('/:id', authUser, updateDepartment)

router.patch('/deactivate-department', authUser, deactivatePromotion)

router.patch('/activate- department', authUser, activateDepartment)

module.exports = router