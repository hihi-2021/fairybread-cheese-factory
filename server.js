const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const multer = require('multer')


// middleware
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))


// handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// routes
server.get('/', (req,res) => {
    res.send('<h1>hello</h1><p>Bye</p>')
})




module.exports = server