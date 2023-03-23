const express = require('express')

const tweet = require('./tweet-route')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

router.use('/', tweet)

module.exports = router