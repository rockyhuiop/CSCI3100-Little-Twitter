const express = require('express')
const Tweet = require("../model/Tweet")
const {
    nextTweetID,
} = require('../controller/tweet')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

router.post('/', (req, res)=>{

    // counting the total number of tweet existing
    ( async () => {
        var tweetCount = await nextTweetID()
        tweetCount = tweetCount +1
        
        const newTweet = new Tweet({
            tweetID : tweetCount,
            CreatorUserID : req.session.userid,
            Content : req.body.Content,
            LikeCount: 0,
            DisLikeCount: 0,
            SuspensionStatus: false
        })
        newTweet.save()
    }
    )()

    res.status(200).json({message: "success, posted tweet"})
})

module.exports = router