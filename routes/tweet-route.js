const express = require('express')
const Tweet = require("../model/Tweet")
const Comment = require("../model/Comment")

const {
    CreateTweet,
    ReTweet,
    CreateComment,
    ReplyComment,
    AmendTweetLike,
    AmendTweetDisLike,
    AmendCommentLike,
    AmendCommentDisLike,
    EditTweetContent,
    EditCommentContent,
    DelComment,
    DelTweet,
} = require('../controller/tweet')



router = express.Router()

//Posting Tweet
router.post('/', (req, res)=>{

    ( async () => {

        await CreateTweet(req.session.userid, req.body.Content)

    }
    )()

    res.status(200).json({message: "success, posted tweet"})
})

//Double Tick Like Tweet 
router.patch('/likeTweet/:tweetID', (req, res)=>{
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
router.patch('/dislikeTweet/:tweetID', (req, res)=>{

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

//Retweet
router.post('/retweet/:tweetID', (req, res) =>{
    (async () => {

        const {tweetID: retweetID} = req.params

        await ReTweet(retweetID, req.session.userid, req.body.Content)
    }
    )()

    res.status(200).json({message: "success, posted retweet"})

})

//Posting Comment on Tweet
router.post('/comment/:tweetID', (req, res)=>{

    ( async () => {

        const {tweetID:tweetID} = req.params

        await CreateComment(tweetID, req.session.userid, req.body.Content)

    }
    )()

    res.status(200).json({message: "success, posted comment"})
})

//Reply Comment
router.post('/replycomment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params

        await ReplyComment(commentID, req.session.userid, req.body.Content)

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

//Double Tick Like Comment 
router.patch('/likeComment/:commentID', (req, res)=>{
    ( async () => {

        const {commentID:commentID} = req.params
        const userID = req.session.userid

        await AmendCommentLike(commentID, userID)

        res.status(200).json({
            state: "Success"
        })
    }
    )()

})

//Double Tick DisLike Comment 
router.patch('/dislikeComment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params
        const userID = req.session.userid

        await AmendCommentDisLike(commentID, userID)

        res.status(200).json({
            state: "Success"
        })
    }
    )()

})

//Delete Comment
router.delete('/deleteComment/:commentID', (req, res) => {
    (async() => {
        const {commentID:commentID} = req.params
        await DelComment(commentID, req.session.userid)

        res.status(200).json({
            state: "Success"
        })
    })

})

//Delete Tweet
router.delete('/deleteTweet/:tweeetID', (req, res) => {
    (async() => {
        const {tweetID:tweetID} = req.params
        await DelTweet(tweetID, req.session.userid)

        res.status(200).json({
            state: "Success"
        })
    })
})



module.exports = router