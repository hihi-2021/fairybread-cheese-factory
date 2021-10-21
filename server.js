const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const multer = require('multer')
const server = express()

// middleware
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))


// handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// routes
server.get('/:id', (req,res) => {
    if (req.params.id == "home") {
        var viewData = {
            title: 'The Grate Cheese Off',
          }
        var template = 'home'
    } else if (req.params.id == "add") {
        var viewData = {
            title: 'Cheese Culture Factory',
          }
        var template = 'add'
    }
      res.render(template, viewData)
})




module.exports = server