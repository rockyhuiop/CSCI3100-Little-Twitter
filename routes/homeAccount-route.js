const express = require('express')
const Tweet = require("../model/Tweet")
const {
    nextTweetID,
    AmendTweetLike,
    AmendTweetDisLike,
} = require('../controller/tweet')

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

router.post('/', (req, res)=>{

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

//Double Tick Like Tweet 
router.patch('/like/:tweetID', (req, res)=>{

    // counting the total number of tweet existing
    ( async () => {

        const {tweetID:tweetID} = req.params
        const userID = req.session.userid

        await AmendTweetLike(tweetID, userID)

        res.status(200).json({
            state: "Success"
        })
    }
    )()

})

//Double Tick DisLike Tweet 
router.patch('/dislike/:tweetID', (req, res)=>{

    // counting the total number of tweet existing
    ( async () => {

        const {tweetID:tweetID} = req.params
        const userID = req.session.userid

        await AmendTweetDisLike(tweetID, userID)

        res.status(200).json({
            state: "Success"
        })
    }
    )()

})

module.exports = router