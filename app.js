const express = require('express')
const { user } = require('./data.js')

app = express()

app.get('/', (req, res) => {
    console.log('connected to homepage')
    res.status(200).send('Home page')
})

app.get('/login', (req, res) => {
    console.log('connected to login page')
    res.status(200).send('Login page')
})

app.get('/user', (req, res) => {
    console.log('connected to user page')
    res.status(200).json(user)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404<h1>')
})

app.listen(1024, () => {
    console.log('Server listening on port 1024')
})