const express = require('express')

const {
    FetchTweetByContent,
} = require('../controller/tweet')

router = express.Router()

//Searching Tweet by Specific Content

router.get('/SearchTweetByContent/:Content', (req, res) => {
    (async() => {
        const {Content:specificContent} = req.params
        const SearchedTweet = await FetchTweetByContent(specificContent)
        res.status(200).json({message : SearchedTweet})
    })()
})

module.exports = router