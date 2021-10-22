const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const multer = require('multer')
const server = express()
const cheeseData = require('./cheeseData.json')
const testFunc = require('./functions')


// multer configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
  
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

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

server.post('/add', upload.single('cheeseImage'), (req, res)=> {
	const newCheeseData = req.body
	/*fs.readFile('./cheeseData.json', (err, data) => {
	if (err) console.log(err)
	const listOCheese = JSON.parse(data).cheeseSelection*/
	let cheeseList = [...cheeseData.cheeseSelection]
	let newCheeseId = Math.max(...cheeseList.map(el => el.id)) + 1
	newCheeseData.id = newCheeseId
	newCheeseData.image = req.file.filename
    newCheeseData.votes = 0
    const newCheeseList = [...cheeseList, newCheeseData]
    const newData = {cheeseSelection: newCheeseList}

    
    fs.writeFile('cheeseData.json', JSON.stringify(newData, null, 2), function (err) {
        if (err) throw err
      })
      res.redirect('home')
})

server.post('/home', (req,res) => {
    let idx = req.body.id
    let arrIdx = idx - 1
    let arr = cheeseData.cheeseSelection
    let voteCount = arr[arrIdx].votes + 1
    arr[arrIdx].votes = voteCount
    fs.writeFile('cheeseData.json', JSON.stringify({cheeseSelection : arr}, null, 2), function (err) {
        if (err) throw err
    })
    res.redirect('home')
})





module.exports = server