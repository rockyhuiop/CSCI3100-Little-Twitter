// import requirements
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
dotenv.config()

//pages-routes
const home_guest = require('./routes/homeGuest-route.js')
const home_account = require('./routes/homeAccount-route.js')
const login = require('./routes/login-route.js')
const registration = require('./routes/registration-route.js')
const profile = require('./routes/profile-route.js')
const user = require('./routes/user-route.js')
const dashboard = require('./routes/dashboard-route.js')


app = express()
router = express.Router()

//pages
app.use('/', home_guest)
app.use('/home', home_account)
app.use('/login', login)
app.use('/registration', registration)
app.use('/profile', profile)
app.use('/user', user)
app.use('/dashboard', dashboard)

app.all('*', (req, res)=>{
    res.status(404).send(`<h1>Not Found</h1>`)
})

// connect to database
mongoose
    .connect(process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log(`Connected to mongoDB`))
    .then(()=> {app.listen(process.env.PORT || 5000, ()=>console.log(`Server running on port: ${process.env.PORT}`))})
    .catch((err)=>{console.log(`Error: ${err}`)})