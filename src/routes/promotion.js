const express = require('express')
const { authUser } = require('../middlewares/auth')
const {
    createPromotion,
    getAllPromotion,
    updatePromotion,
    deactivatedPromotion,
    getAllRemove,
    activatedPromotion
} = require('../controllers/promotion')


const router = new express.Router()

router.post('/add', authUser, createPromotion)

router.get('/', authUser, getAllPromotion)

router.patch('/:id', authUser, updatePromotion)

router.patch('/deactivate-promotion/:id', authUser, deactivatedPromotion)

router.patch('/activate-promotion/:id', authUser, activatedPromotion)


module.exports = router