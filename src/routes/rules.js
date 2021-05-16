const express = require('express')
const { createRole, getAllRole, updateRole} = require('../controllers/rule')
const router = new express.Router()



router.post('/add', createRole)

router.get('/', getAllRole)

router.patch('/:id', updateRole)

module.exports = router