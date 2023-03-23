const Tweet = require ('../model/Tweet')
const User = require ('../model/User')

const nextTweetID = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
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

module.exports = {
    nextTweetID,
    AmendTweetLike,
    AmendTweetDisLike,
}