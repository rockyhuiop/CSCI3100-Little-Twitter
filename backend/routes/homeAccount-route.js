const express = require('express')

const tweet = require('./tweet-route')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json({state: "Success", data: {}})
})

router.use('/', tweet)

module.exports = router