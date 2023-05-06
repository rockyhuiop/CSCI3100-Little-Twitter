const express = require('express')
router = express.Router()
const {
    FetchHomeTweet,
} = require('../controller/tweet')

router.get('/', (req, res)=>{
    res.status(200).json({state: "Success", data: {}})
})

//Fetch all Tweet

router.get('/FetchAllTweet/', (req, res) => {
    (async() => {
        const TweetList = await FetchHomeTweet("")
        res.status(200).json({message: TweetList})
    })()
})

module.exports = router