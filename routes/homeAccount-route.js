const express = require('express')
const Tweet = require("../model/Tweet")

router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send(`<h1>logged in Home page</h1>`)
})

router.post('/', (req, res)=>{

    // counting the total number of tweet existing

    async function count() {
        const tweetCount = await Tweet.estimatedDocumentCount() + 1
    }

    const newTweet = new Tweet({
        tweetID : tweetCount,
        CreatorUserID : req.session.userid,
        Content : req.body.Content,
        LikeCount: 0,
        DisLikeCount: 0,
        SuspensionStatus: false
    })
    newTweet.save()
    return res.status(200).json({message: "success, posted tweet"})
})

module.exports = router