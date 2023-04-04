// import requirements
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const https = require('https')
const fs = require("fs");

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require('body-parser');


mongoose.set('strictQuery', true)
dotenv.config()

//pages-routes
const initizalize_db = require('./routes/initialize-route.js')
const home_guest = require('./routes/homeGuest-route.js')
const home_account = require('./routes/homeAccount-route.js')
const login = require('./routes/login-route.js')
const logout = require('./routes/logout-route.js')
const registration = require('./routes/registration-route.js')
const profile = require('./routes/profile-route.js')
const user = require('./routes/user-route.js')
const dashboard = require('./routes/dashboard-route.js')
const tweet = require('./routes/tweet-route')


app = express()
router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: 86400000 },
    resave: false 
}));

//pages
app.use('/', home_guest)
app.use('/initialize', initizalize_db)
app.use('/login', login)
app.use('/registration', registration)

app.use((req, res, next)=>{
    if(!req.session.userid){
        console.log('not logged in')
        return res.status(401).json({error: "Not logged in"})
    }
    next()
})

app.use('/home', home_account)
app.use('/logout', logout)
app.use('/profile', profile)
app.use('/user', user)
app.use('/dashboard', dashboard)
app.use('/tweet', tweet)

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
    //.then(()=> {app.listen(process.env.PORT || 5000, ()=>console.log(`Server running on port: ${process.env.PORT}`))})
    .catch((err)=>{console.log(`Error: ${err}`)})

https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app)
    .listen(process.env.PORT || 5000, ()=>{
      console.log(`server is runing at port ${process.env.PORT}`)
    });