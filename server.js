const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const { get } = require('http')
const server = express()

server.get('/', (req,res) => {
    res.send('<h1>hello</h1><p>Bye</p>')
})




module.exports = server