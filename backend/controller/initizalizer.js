const Counter = require('../model/Counter')
const Tweet = require ('../model/Tweet')
const User = require ('../model/User')

const CountTweet = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
}

const CountComment = async () => { 
    const totalCommentCount = await Comment.count()
    return totalCommentCount
}

const initializeDB = async() => {
    var TweetCount = await CountTweet()
    var CommentCount = await CountComment()

    const newTweetCounter = new Counter({
        TargetToCount: "Tweet",
        Counter: TweetCount
    })
    newTweetCounter.save()
    
    const newCommentCounter = new Counter({
        TargetToCount: "Comment",
        Counter: CommentCount
    })
    newCommentCounter.save()
}

const initizalizedRetweetID = async() => {

    const AllUser = await User.find()
    var currUser = {}
    for (let i = 0, len = AllUser.length; i< len; i++) {
        currUser = AllUser[i]
        currUser.retweetedTweetID = []
        await currUser.save()
}

    const AllTweet = await Tweet.find()

    var currTweet = {}
    for (let i = 0, len = AllTweet.length; i< len; i++) {
        currTweet = AllTweet[i]
        if (currTweet.ReTweetID!==undefined){
            const currUser = await User.findOne({tweetID: currTweet.CreatorUserID})
            if (!(currUser.retweetedTweetID.includes(currTweet.ReTweetID))){
                currUser.retweetedTweetID.push(currTweet.ReTweetID)
                await currUser.save()
            }
        }
    }
}

module.exports = {
    initializeDB,
    initizalizedRetweetID,
}