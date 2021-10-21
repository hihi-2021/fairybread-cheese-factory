const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const multer = require('multer')
const server = express()
const cheeseData = require('./cheeseData.json')

// middleware
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))


// handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// routes
server.get('/:title', (req,res) => {
    if (req.params.title == "home") {
        var viewData = {
            title: 'The Grate Cheese Off',
            cheeseSelection: cheeseData.cheeseSelection
          }
        var template = 'home'
    } else if (req.params.title == "add") {
        var viewData = {
            title: 'Cheese Culture Factory',
          }
        var template = 'add'
    }
      res.render(template, viewData)
})

// server.get('/', (req, res) => {
//     fs.readFile('./cheeseData.json', 'utf-8', (err, data) => {
//       if (err) return res.status(500).send(err.message)
//       res.render('home', JSON.parse(data))
//     })
//   })




module.exports = server