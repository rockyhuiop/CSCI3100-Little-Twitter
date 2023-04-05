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
    const comment = await Comment.findOne({commentID : commentID})
    const user = await User.findOne({tweetID : userID})
    if (comment.CreatorUserID == userID || user.userType == 'admin'){
        await comment.deleteOne()
        // Update likedCommentID/dislikedCommentID List of each user
        RemovelikeCommentID(commentID)
        RemovedislikeCommentID(commentID)
        return true
    } else {
        return false
    }
}

const DelTweet = async(tweetID, userID) => {
    const tweet = await Tweet.findOne({tweetID : tweetID})
    const user = await User.findOne({tweetID : userID})
    if (tweet.CreatorUserID == userID || user.userType == 'admin'){
        await tweet.deleteOne()
        // Update likedTweetID/dislikedTweetID List of each user
        RemovelikeTweetID(tweetID)
        RemovedislikeTweetID(tweetID)
        return true
    } else {
        return false
}
}

const RemovelikeTweetID = async(tweetID) => {
    const filter = {likedTweetID : {$in : [tweetID]}}
    const query = {$pull:{likedTweetID :tweetID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovedislikeTweetID = async(tweetID) => {
    const filter = {dislikedTweetID : {$in : [tweetID]}}
    const query = {$pull:{dislikedTweetID :tweetID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovelikeCommentID = async(commentID) => {
    const filter = {likedCommentID : {$in : [commentID]}}
    const query = {$pull:{likedCommentID :commentID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const RemovedislikeCommentID = async(commentID) => {
    const filter = {dislikedCommentID : {$in : [commentID]}}
    const query = {$pull:{dislikedCommentID :commentID}}
    const result = await User.updateMany(filter, query, {multi: true})
    console.log(result)
}

const FetchFollowing = async(userID) => {
    const targetUser = await User.findOne({tweetID:userID})
    const followings = await targetUser.followings
    return followings
    
}

const FetchReplyComment = async(commentID) => {

    const FetchReplyCommentList = await Comment.find({corrCommentID:commentID, SuspensionStatus:false})

    var ReplyCommentList = []
    var replyComment = {}

    for (let i = 0, len = FetchReplyCommentList.length; i<len; i++){

        var fetchReplyComment = FetchReplyCommentList[i]

        replyComment = {
            CreatorUserID: fetchReplyComment.CreatorUserID,
            Content: fetchReplyComment.Content,
            LikeCount: fetchReplyComment.LikeCount,
            DisLikeCount: fetchReplyComment.DisLikeCount,
        }

        ReplyCommentList.push(replyComment)

    }

    return ReplyCommentList
}

const FetchComment = async(tweetID) => {
    const FetchCommentList = await Comment.find({corrTweetID:tweetID, SuspensionStatus:false})
    
    var CommentList = []
    var comment = {}

    //collecting the related comment accordingly

    for (let i = 0, len = FetchCommentList.length; i<len; i++){

        var fetchComment = FetchCommentList[i]

        comment = {
            CreatorUserID: fetchComment.CreatorUserID,
            Content: fetchComment.Content,
            LikeCount: fetchComment.LikeCount,
            DisLikeCount: fetchComment.DisLikeCount,
        }

        //collecting the reply accordingly

        const ReplyCommentList = await FetchReplyComment(fetchComment.commentID)

        comment['ReplyComment'] = ReplyCommentList

        CommentList.push(comment)

    }

    return CommentList

}

const FetchTweet = async(userID) => {
    const FetchTweetList = await Tweet.find({CreatorUserID:userID, SuspensionStatus:false})
    var TweetList = []
    var tweet = {}
    // collecting the tweet from the followings

    for (let i = 0, len = FetchTweetList.length; i<len; i++){

        var fetchTweet = FetchTweetList[i]

        tweet = {

            CreatorUserID : fetchTweet.CreatorUserID,
            Content : fetchTweet.Content,
            LikeCount : fetchTweet.LikeCount,
            DisLikeCount : fetchTweet.DisLikeCount,
            ReTweetCount : fetchTweet.ReTweetCount,

            }

        //collecting the related comments

        const CommentList = await FetchComment(fetchTweet.tweetID)

        tweet['Comment'] = CommentList

        TweetList.push(tweet)

        }

    
    return TweetList
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
    FetchFollowing,
    FetchTweet,
}