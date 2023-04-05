const express = require('express')

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
    FetchFollowing,
    FetchTweet,
    FetchHomeTweet,
} = require('../controller/tweet')
const { del } = require('express/lib/application')



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

        const {LikeCount, DisLikeCount} = await AmendTweetLike(tweetID, userID)

        res.status(200).json({
            state: "Success",
            LikeCount: LikeCount,
            DisLikeCount: DisLikeCount,
        })
    }
    )()

})

//Double Tick DisLike Tweet 
router.patch('/dislikeTweet/:tweetID', (req, res)=>{

    ( async () => {

        const {tweetID:tweetID} = req.params
        const userID = req.session.userid

        const {LikeCount, DisLikeCount} = await AmendTweetDisLike(tweetID, userID)

        res.status(200).json({
            state: "Success",
            LikeCount: LikeCount,
            DisLikeCount: DisLikeCount,
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

        const {LikeCount, DisLikeCount} = await AmendCommentLike(commentID, userID)

        res.status(200).json({
            state: "Success",
            LikeCount: LikeCount,
            DisLikeCount: DisLikeCount,
        })
    }
    )()

})

//Double Tick DisLike Comment 
router.patch('/dislikeComment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params
        const userID = req.session.userid

        const {LikeCount, DisLikeCount} = await AmendCommentDisLike(commentID, userID)

        res.status(200).json({
            state: "Success",
            LikeCount: LikeCount,
            DisLikeCount: DisLikeCount,
        })
    }
    )()

})

//Delete Comment
router.delete('/deleteComment/:commentID', (req, res) => {
    (async() => {
        const {commentID:commentID} = req.params

        const result = await DelComment(commentID, req.session.userid)

        if (result){
            res.status(200).json({
                state: "Success"
            })
        }else{
            res.status(400).json({
                state: "fail", 
                message: "You are not authorized to delete the comment"
            })
        }

    })()

})

//Delete Tweet
router.delete('/deleteTweet/:tweetID', (req, res) => {
    (async() => {
        const {tweetID:tweetID} = req.params

        const result = await DelTweet(tweetID, req.session.userid)

        if (result){
            res.status(200).json({
                state: "Success"
            })
        }else{
            res.status(400).json({
                state: "fail", 
                message: "You are not authorized to delete the tweet"
            })
        }
    })()
})

//Display Tweet to User in Home Page
//It is expected to be used in homepage
router.get('/fetchHomeTweet', (req, res) => {
    (async() => {
        const userID = req.session.userid
        const followings = await FetchFollowing(userID)
        var relatedUserId = followings
        relatedUserId.push(userID)
        const fetchedTweet = await FetchHomeTweet(relatedUserId)
        res.status(200).json({message : fetchedTweet})
    })()
})

//Display Particular Tweet to User in Tweet Page
//It is expected to be used in Tweet Page

router.get('/fetchTweet/:tweetID', (req, res) => {
    (async() => {
        const {tweetID:tweetID} = req.params
        const fetchedTweet = await FetchTweet(tweetID)
        res.status(200).json({message : fetchedTweet})
    })()
})



module.exports = router