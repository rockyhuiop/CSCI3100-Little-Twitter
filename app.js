const express = require('express')
const { user } = require('./data.js')

app = express()

const midware = (req, res, next)=>{
    console.log('this is middleware')
    next()
}

app.use('/login', midware)

app.get('/', (req, res) => {
    console.log('connected to homepage')
    res.status(200).send('Home page')
})

app.get('/login', (req, res) => {
    console.log('connected to login page')
    const { name, id } = req.query
    console.log(`${name}, ${id}`)
    return res.status(200).send('Login page')
})

app.get('/user', (req, res) => {
    console.log('connected to user page')
    return res.status(200).json(user)
})

app.all('*', (req, res) => {
    return res.status(404).send('<h1>Error 404<h1>')
})

app.listen(1024, () => {
    console.log('Server listening on port 1024')
})