const express = require('express')
const app = express()
const port = 3000

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: []})
  .write()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
  res.render('index' ,{
    name: "this is name ^^"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/users', (req, res) => {
  res.render('users/index' ,{
  users: db.get('users').value()
  })})

  
  app.get('/users/create', (req, res) => {
    res.render('users/create' )})

  app.post('/users/create' , function(req,res){
   db.get('users').push(req.body).write();
    res.redirect('/users')
  })

  app.get('/users/seach', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get(users).filter( function(user){
       return   user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    });
    res.render('users/index',{
      users : matchedUsers
    });
 
    })