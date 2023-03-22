const Tweet = require ('../model/Tweet')
const User = require ('../model/User')

const nextTweetID = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
}

const TweetLikeStatus = async (tweetID, userID) => {
    const RelatedUser = User.findOne({tweetID : userID})
    return userLikeTweet.likedTweetID.includes(tweetID)
}

const RemoveTweetLike = async(tweetID, userID) =>{

}

module.exports = {
    nextTweetID,
    TweetLikeStatus,
    RemoveTweetLike,
}