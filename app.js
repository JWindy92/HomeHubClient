'use strict'

const express = require('express')
const fetch = require('node-fetch')
const io = require("socket.io-client")
const sockets = require("socket.io")
const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    let data = {
        test: "test"
    }
    fetch('http://localhost:3001/devices')
    .then((res) => res.json())
    .then((json) => {
        data['devices'] = json
        console.log(data);
    }).then(() => {
        res.render('index', data)
    })
})

app.get('/add_device', (req, res) => {
    res.render('add_device')
})

const server = app.listen(port, () => {
    console.log(`Client Listening at http://localhost:${port}`)
})



