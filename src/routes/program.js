const express = require('express')
const {authUser} = require('../middlewares/auth')
const {
    createProgram,
    getAllProgram,
    updateProgram,
    deactivateProgram,
    getAllProgramDeactivate,
    activateProgram
} = require('../controllers/program')

const router = new express.Router()

router.post('/add', authUser, createProgram)

router.get('/', authUser, getAllProgram)

router.patch('/:id', authUser, updateProgram)

router.patch('/deactivate-program/:id', authUser, deactivateProgram)

router.get('/deactivate-program/', authUser, getAllProgramDeactivate)

router.patch('/activate-program/:id', authUser, activateProgram)


module.exports = router