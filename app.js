const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const App = express()
App.set('view engine', 'ejs')
App.use(bodyParser.urlencoded({extended:true}))
App.use(express.static("public"))
let Users = []

App.get('/', (req, res) =>{
    res.render('home')
})

App.get('/users', (req, res) =>{
    res.render('users', {users: Users})
})

App.post('/submit-data', (req,res) =>{
    let tempUser = {
        name: req.body.name,
        regno: req.body.regno,
        email: req.body.email,
    }
    // Users.push(tempUser)
    let usercount = Users.filter((user)=>{
        return user.email == req.body.email
    })

    if(usercount.length == 0)
    {
        Users.push(tempUser)
        res.render('success', {name: req.body.name})
    }
    else{
        res.render('failure', {name: req.body.name, email: req.body.email})
    }
}
)


App.listen(3000)
console.log('Server is starting')