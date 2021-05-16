const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db/mongoose')

const routerRule = require('./routes/rules')
const routerUser = require('./routes/users')
const app = express()
app.use(cors())

const port = process.env.PORT || 3000

app.use(express.urlencoded( { extended: true }))
app.use(express.json())

app.get('/', async (req, res ) => {
    res.status(200).send({
        state: true,
        message: 'WELCOME TO AN ACADEMIC MANAGEMENT API DEVELOP BY LYON TECHNOLOGIES'
    })
})

app.use('/api/rule', routerRule)
app.use('/api/users', routerUser)


app.listen(port, () => {

    console.log('Server started on port ' + port)
})