const express = require('express')
const mongoose = require('mongoose')
const User = require('./Model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('./Model/auth')
const app = express()
const port = 6000
const connstring = 'mongodb+srv://st10122517:WnpNYoa7xMx18YsB@cluster0.gs4rulm.mongodb.net/'

mongoose.connect(connstring, {
    useNewurlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Mongodb connected successfully.')
})
.catch(error => {
    console.error('Connection failed')
})
app.use(express.json())//middleware


//create user account with hased password.
const saltRounds = 10
app.post('/register', (req, res) =>{

    bcrypt.hash(req.body.password,saltRounds)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        })
        user.save()
        .then(result =>{ //then, if it managed to save
            req.status(201).json({message: 'User saved successfully', result})
        })
        .catch(err =>{
            res.status(500).json({error: 'Failed to save user!'})
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: 'Hashing failed'})
    })
})

//log in feature with bcrypt compare
app.post('./login', (req, res) =>{
    const {username, password} = req.body
    User.findOne({username})
    .then(user =>{
        if(!user){
            return res.status(401).json({error: 'Authentication failed!'})
        }
        bcrypt.compare(password, user.password)
        .then(match =>{
            if(match){
                const token = jwt.sign({username: user.username, userid: user_id},
                    'UsingjsonWebTokenToGenerateAsSessionToken', {expiresIn: '1h'})
                res.status(201).json({message: 'Authenticated successfully'})
                console.log(token)
            }else{
                res.status(401).json({error: 'Authentication failed!'})
            }
        })
        .catch(err =>{
            res.status(500).json({err: 'failed to login please check username or password.'})
        })
    })
})

//add data to the database 
app.post('/task', async(REQ, RES) =>{
    const newTaskData = req.body
    try{
        const newTask = await Task.create(newTaskData)
        res.status(201).json(newTask)
    }
    catch(error) {
        console.status(500).jdon({error: 'an error has occured'})
    }
})

//retrieves data from database
app.get('/taks', (req, res) => {
    Task.find()
    .then((newTask) =>{
        res.json({
            message: 'Task found',
            newTask: newTask
        })
    })
})

//delete data from database
app.delete('/task/:id', (req, res) =>{
    Task.deleteOne({_id: req.params.id})
    .then((result) =>{
        res.status(201).json({message: 'Task deleted', result: result})
    })
})

//cross-origin resource sharing
app.use((reg, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = app