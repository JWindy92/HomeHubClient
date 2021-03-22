'use strict'

const express = require('express')
const io = require("socket.io-client")
const sockets = require("socket.io")
const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(port, () => {
    console.log(`Client Listening at http://localhost:${port}`)
})



