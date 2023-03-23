const express = require('express')
const Tweet = require("../model/Tweet")
const Comment = require("../model/Comment")
const {
    nextTweetID,
    nextCommentID,
    AmendTweetLike,
    AmendTweetDisLike,
    EditTweetContent,
    EditCommentContent,
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
router.patch('/editTweet/:tweetID', (req, res)=>{

        ( async () => {

            const {tweetID:tweetID} = req.params
    
            await EditTweetContent(tweetID, req.body.Content)
    
            res.status(200).json({
                state: "Success"
            })
        }
        )()

})

//Posting Comment on Tweet
router.post('/comment/:tweetID', (req, res)=>{

    ( async () => {

        const {tweetID:tweetID} = req.params

        var commentCount = await nextCommentID()
        commentCount = commentCount +1
        
        const newComment = new Comment({
            commentID : commentCount,
            CreatorUserID : req.session.userid,
            corrTweetID : tweetID,
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

//Reply Comment
router.post('/replycomment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params

        var commentCount = await nextCommentID()
        commentCount = commentCount +1
        
        const newComment = new Comment({
            commentID : commentCount,
            CreatorUserID : req.session.userid,
            corrCommentID : commentID,
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

// Edit Comment
router.patch('/editComment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params

        await EditCommentContent(commentID, req.body.Content)

        res.status(200).json({
            state: "Success"
        })
    }
    )()

})

module.exports = router