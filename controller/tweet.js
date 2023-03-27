const Tweet = require ('../model/Tweet')
const User = require ('../model/User')
const Comment = require("../model/Comment")
const Counter = require('../model/Counter')

const {
    IncreTweetCount,
    IncreCommentCount,
} = require('../controller/counter')

const nextTweetID = async () => { 
    const TweetCounter = await Counter.findOne({TargetToCount:"Tweet"})
    const totalTweetCount = TweetCounter.Counter
    return totalTweetCount
}

const nextCommentID = async () => { 
    const CommentCounter = await Counter.findOne({TargetToCount:"Comment"})
    const totalCommentCount = CommentCounter.Counter
    return totalCommentCount
}

const CreateTweet = async (userID, Content) => {

    var tweetCount = await nextTweetID()
    tweetCount = tweetCount +1
    
    const newTweet = new Tweet({
        tweetID : tweetCount,
        CreatorUserID : userID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        ReTweetCount:0,
        SuspensionStatus: false
    })
    await newTweet.save()

    //Increment the Tweet Counter
    await IncreTweetCount()

}

const ReTweet = async (retweetID,userid, Content) => {

    var tweetCount = await nextTweetID()
    tweetCount = tweetCount +1

    const newTweet = new Tweet({
        tweetID : tweetCount,
        CreatorUserID : userid,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        ReTweetCount:0,
        ReTweetID: retweetID,
        SuspensionStatus: false
    })
    await newTweet.save()

    //Increment Retweet Count
    await IncreReTweetCount(retweetID)

    //Increment the Tweet Counter
    await IncreTweetCount()

}

const CreateComment = async (tweetID, userid, Content) => {
    var commentCount = await nextCommentID()
    commentCount = commentCount +1
    
    const newComment = new Comment({
        commentID : commentCount,
        CreatorUserID : userid,
        corrTweetID : tweetID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        SuspensionStatus: false
    })
    await newComment.save()

    //Increment the Comment Counter
    await IncreCommentCount()

}

const ReplyComment = async (commentID, userid, Content) => {

    var commentCount = await nextCommentID()
    commentCount = commentCount +1
    
    const newComment = new Comment({
        commentID : commentCount,
        CreatorUserID : userid,
        corrCommentID : commentID,
        Content : Content,
        LikeCount: 0,
        DisLikeCount: 0,
        SuspensionStatus: false
    })
    await newComment.save()

    //Increment the Comment Counter
    await IncreCommentCount()

}

const AmendTweetLike = async (tweetID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const tweet = await Tweet.findOne({tweetID : tweetID})
    if (RelatedUser){
        // amend the user liked tweet list and tweet like count
        if(RelatedUser.likedTweetID.includes(tweetID)){

            const index = RelatedUser.likedTweetID.indexOf(tweetID)
            RelatedUser.likedTweetID.splice(index, 1)
            
            tweet.LikeCount = tweet.LikeCount - 1

        }else{
            RelatedUser.likedTweetID.push(tweetID)
            tweet.LikeCount = tweet.LikeCount + 1

            if(RelatedUser.dislikedTweetID.includes(tweetID)){

                const index = RelatedUser.dislikedTweetID.indexOf(tweetID)
                RelatedUser.dislikedTweetID.splice(index, 1)
                
                tweet.DisLikeCount = tweet.DisLikeCount - 1
            }

        }

        await RelatedUser.save()
        await tweet.save()
    }
}

const AmendTweetDisLike = async (tweetID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const tweet = await Tweet.findOne({tweetID : tweetID})
    if (RelatedUser){
        // amend the user liked tweet list and tweet like count
        if(RelatedUser.dislikedTweetID.includes(tweetID)){

            const index = RelatedUser.dislikedTweetID.indexOf(tweetID)
            RelatedUser.dislikedTweetID.splice(index, 1)
            
            tweet.DisLikeCount = tweet.DisLikeCount - 1

        }else{
            RelatedUser.dislikedTweetID.push(tweetID)
            tweet.DisLikeCount = tweet.DisLikeCount + 1

            if(RelatedUser.likedTweetID.includes(tweetID)){

                const index = RelatedUser.likedTweetID.indexOf(tweetID)
                RelatedUser.likedTweetID.splice(index, 1)
                
                tweet.LikeCount = tweet.LikeCount - 1
            }

        }

        await RelatedUser.save()
        await tweet.save()
    }
}

const IncreReTweetCount = async(retweetID) => {
    const retweet = await Tweet.findOne({tweetID: retweetID})
    retweet.ReTweetCount = retweet.ReTweetCount + 1
    await retweet.save()
}

const EditTweetContent= async (tweetID, content) => {
    const tweet = await Tweet.findOne({tweetID : tweetID})
    tweet.Content = content
    await tweet.save()
}

const EditCommentContent= async (commentID, content) => {
    const comment = await Comment.findOne({commentID : commentID})
    comment.Content = content
    await comment.save()
}

const AmendCommentLike = async (commentID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const comment = await Comment.findOne({commentID : commentID})
    if (RelatedUser){
        // amend the user liked comment list and tweet like count
        if(RelatedUser.likedCommentID.includes(commentID)){

            const index = RelatedUser.likedCommentID.indexOf(commentID)
            RelatedUser.likedCommentID.splice(index, 1)
            
            comment.LikeCount = comment.LikeCount - 1

        }else{
            RelatedUser.likedCommentID.push(commentID)
            comment.LikeCount = comment.LikeCount + 1

            if(RelatedUser.dislikedCommentID.includes(commentID)){

                const index = RelatedUser.dislikedCommentID.indexOf(commentID)
                RelatedUser.dislikedCommentID.splice(index, 1)
                
                comment.DisLikeCount = comment.DisLikeCount - 1
            }

        }

        await RelatedUser.save()
        await comment.save()
    }
}

const AmendCommentDisLike = async (commentID, userID) => {

    const RelatedUser = await User.findOne({tweetID : userID})
    const comment = await Comment.findOne({commentID : commentID})
    if (RelatedUser){
        // amend the user liked comment list and tweet like count
        if(RelatedUser.dislikedCommentID.includes(commentID)){

            const index = RelatedUser.dislikedCommentID.indexOf(commentID)
            RelatedUser.dislikedCommentID.splice(index, 1)
            
            comment.DisLikeCount = comment.DisLikeCount - 1

        }else{
            RelatedUser.dislikedCommentID.push(commentID)
            comment.DisLikeCount = comment.DisLikeCount + 1

            if(RelatedUser.likedCommentID.includes(commentID)){

                const index = RelatedUser.likedCommentID.indexOf(commentID)
                RelatedUser.likedCommentID.splice(index, 1)
                
                comment.LikeCount = comment.LikeCount - 1
            }

        }

        await RelatedUser.save()
        await comment.save()
    }
}

const DelComment = async(commentID, userID) => {
    const comment = Comment.findOne({commentID : commentID})
    const user = await User.findOne({tweetID : userID})
    if (comment.CreatorUserID == userID){
        await comment.deleteOne()
    } else if (user.userType == 'admin') {
        await comment.deleteOne()
    }else {
        return res.status(400).json({state: "fail", message: "You are not authorized to delete the comment"})
    }
    
}

const DelTweet = async(tweetID, userID) => {
    const tweet = Tweet.findOne({tweetID : tweetID})
    const user = await User.findOne({tweetID : userID})
    if (tweet.CreatorUserID == userID || user.userType == 'admin'){
        const result = await Tweet.deleteOne({tweetID : tweetID})
        return true
    } else {
        return false
}
}
module.exports = {
    CreateTweet,
    ReTweet,
    CreateComment,
    ReplyComment,
    AmendTweetLike,
    AmendTweetDisLike,
    IncreReTweetCount,
    AmendCommentLike,
    AmendCommentDisLike,
    EditTweetContent,
    EditCommentContent,
    DelComment,
    DelTweet,
}