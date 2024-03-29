const express = require('express')
const path = require('path')
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
    FetchTweetComment,
    FetchComment,
    TweetRecommandation,
} = require('../controller/tweet')
const { del } = require('express/lib/application')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  })
  
const upload = multer({ storage })

router = express.Router()

//Posting Tweet
router.post('/', upload.array('images', 10), (req, res)=>{

    ( async () => {

        await CreateTweet(req.session.userid, req.body, req.files)

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
    
            await EditTweetContent(tweetID, req.body)
    
            res.status(200).json({
                state: "Success"
            })
        }
        )()

})

//Retweet
router.post('/retweet/:tweetID', upload.array('images', 10), (req, res) =>{
    (async () => {

        const {tweetID: retweetID} = req.params

        try{
            await ReTweet(retweetID, req.session.userid, req.body, req.files)
            res.status(200).json({message: "success, posted retweet"})
        }catch(err){
            res.status(500).json(err)
        }

        
    }
    )()

    
})

//Posting Comment on Tweet
router.post('/comment/:tweetID', (req, res)=>{

    ( async () => {

        const {tweetID:tweetID} = req.params

        await CreateComment(tweetID, req.session.userid, req.body)

    }
    )()

    res.status(200).json({message: "success, posted comment"})
})

//Reply Comment
router.post('/replycomment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params

        await ReplyComment(commentID, req.session.userid, req.body)

    }
    )()

    res.status(200).json({message: "success, posted comment"})
})

// Edit Comment
router.patch('/editComment/:commentID', (req, res)=>{

    ( async () => {

        const {commentID:commentID} = req.params

        await EditCommentContent(commentID, req.body)

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

//Fetch Comment by related tweetID

router.get('/FetchComment/:tweetID', (req, res) => {
    (async() => {
        const {tweetID:tweetID} = req.params
        const CommentList = await FetchTweetComment(tweetID)
        res.status(200).json({message: CommentList})
    })()
})

router.get('/FetchCommentByCommentID/:commentID', (req,res) => {
    (async() => {
        const {commentID: commentID} = req.params
        const targetComment = await FetchComment(commentID)
        if (targetComment.length > 0){
            res.status(200).json({message: targetComment[0]})
        }else{
            res.status(200).json({message: "the comment is removed or suspended"})
        }
    })()
})

//Tweet Recommandation

router.get('/TweetRecommend/', (req, res) => {
    (async() => {
        const userID = req.session.userid
        var relatedUserList = await FetchFollowing(userID)
        relatedUserList.push(userID)
        const recommandedTweet = await TweetRecommandation(relatedUserList)
        res.status(200).json({message : recommandedTweet})
    })()
})




module.exports = router