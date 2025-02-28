require('dotenv').config();

const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()


app.use('/user', expressProxy(`http://localhost:${process.env.USER_PORT}`))
app.use('/captain', expressProxy(`http://localhost:${process.env.CAPTAIN_PORT}`))
app.use('/ride', expressProxy(`http://localhost:${process.env.RIDE_PORT}`))
app.use('/map', expressProxy(`http://localhost:${process.env.MAP_PORT}`))


app.listen(process.env.PORT, () => {
    console.log(`Gateway server listening on port ${process.env.PORT}`)
})