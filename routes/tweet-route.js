const express = require('express')
const Tweet = require("../model/Tweet")
const Comment = require("../model/Comment")
const {
    nextTweetID,
    nextCommentID,
    AmendTweetLike,
    AmendTweetDisLike,
    EditTweetContent,
} = require('../controller/tweet')

router = express.Router()

//Posting Tweet
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
        await newTweet.save()
    }
    )()

    res.status(200).json({message: "success, posted tweet"})
})

//Double Tick Like Tweet 
router.patch('/like/:tweetID', (req, res)=>{
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

//Editing Tweet Content
router.patch('/edit/:tweetID', (req, res)=>{

        ( async () => {

            const {tweetID:tweetID} = req.params
    
            await EditTweetContent(tweetID, req.body.Content)
    
            res.status(200).json({
                state: "Success"
            })
        }
        )()

})

//Posting Comment
router.post('/comment/:tweetID', (req, res)=>{

    ( async () => {
        var commentCount = await nextCommentID()
        commentCount = commentCount +1
        
        const newComment = new Comment({
            commentID : commentCount,
            CreatorUserID : req.session.userid,
            Content : req.body.Content,
            LikeCount: 0,
            DisLikeCount: 0,
            SuspensionStatus: false
        })
        await newComment.save()
    }
    )()

    res.status(200).json({message: "success, posted comment"})
})

module.exports = router