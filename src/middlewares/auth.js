const jwt = require('jsonwebtoken')
const Users = require('../models/users')
const Teacher = require('../models/teacher')


exports.authUser = async  (req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const user = await Users.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.user = user

        next()

    }catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}