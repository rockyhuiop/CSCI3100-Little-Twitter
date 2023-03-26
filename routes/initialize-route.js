const express = require('express')
const Counter = require('../model/Counter')
const User = require('../model/User')
const Tweet = require('../model/Tweet')
const {
    CountTweetID,
    CountCommentID,
} = require('../controller/tweet')

router = express.Router()

router.post('/setup', (req, res)=>{

    Counter.findOne({TargetToCount: "Tweet"}).then((counter)=>{
        if (counter) {
            return res.status(400).json({error: "Counter already exist"})
        } else {

            (async ()=> {
                var TweetCount = await CountTweetID()
                var CommentCount = await CountCommentID()
            
                const newTweetCounter = new Counter({
                    TargetToCount: "Tweet",
                    Counter: TweetCount
                })
                newTweetCounter.save()
                
                const newCommentCounter = new Counter({
                    TargetToCount: "Comment",
                    Counter: CommentCount
                })
                newCommentCounter.save()
            }
            )()
            return res.status(200).json({message:"sucess"})
        }
})
})

module.exports = router