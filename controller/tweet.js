const Tweet = require ('../model/Tweet')

const nextTweetID = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
}

module.exports = {
    nextTweetID,
}