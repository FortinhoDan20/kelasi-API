const express = require('express')
const { authUser } = require('../middlewares/auth')
const {
    createUsers,
    getAllUsers,
    getUserId,
    login,
    updateUser,
    deactivateUser,
    getAllUserDeactivate,
    activateUser,
    logout
} = require('../controllers/users')

const router = new express.Router()

router.post('/add', authUser, createUsers)

router.get('/', authUser, getAllUsers)

router.get('/:id', authUser, getUserId)

router.post('/login', login)

router.post('/logout',authUser, logout )


router.patch('/:id',authUser, updateUser)

router.patch('/deactivated-user/:id', authUser, deactivateUser)

router.get('/deactivated-user/', authUser, getAllUserDeactivate)

router.patch('/activated-user/:id',authUser, activateUser)

module.exports = router