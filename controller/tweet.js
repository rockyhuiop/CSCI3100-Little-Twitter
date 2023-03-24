const Tweet = require ('../model/Tweet')
const User = require ('../model/User')
const Comment = require("../model/Comment")

const nextTweetID = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
}

const nextCommentID = async () => { 
    const totalCommentCount = await Comment.count()
    return totalCommentCount
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

module.exports = {
    nextTweetID,
    nextCommentID,
    AmendTweetLike,
    AmendTweetDisLike,
    IncreReTweetCount,
    AmendCommentLike,
    AmendCommentDisLike,
    EditTweetContent,
    EditCommentContent,
}