const express = require('express')
const {
    createUsers,
    getAllUsers,
    getUserId,
    login,
    updateUser,
    withdrawUser,
    getAllUserWithdraw,
    takeBackUser
} = require('../controllers/users')

const router = new express.Router()

router.post('/add', createUsers)

router.get('/', getAllUsers)

router.get('/:id', getUserId)

router.post('login', login)

router.patch('/:id', updateUser)

router.patch('/:id', withdrawUser)

router.get('/withdraw-user/', getAllUserWithdraw)

router.patch(':id', takeBackUser)

module.exports = router