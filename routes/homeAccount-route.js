const express = require('express')
const Tweet = require("../model/Tweet")
const {
    nextTweetID,
    TweetLikeStatus,
    RemoveTweetLike,
} = require('../controller/tweet')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

router.post('/', (req, res)=>{

    const {tweetID} = req.params


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

router.put('/like/:tweetID', (req, res)=>{

    // counting the total number of tweet existing
    ( async () => {

        var LikeStatus = await TweetLikeStatus(req.body.tweetID, req.session.userid)

        if (LikeStatus){
            RemoveTweetLike()
        }else{
            AddTweetLike()
        }
    }
    )()

    res.status(200).json({message: "tweet like count amended"})
})

module.exports = router