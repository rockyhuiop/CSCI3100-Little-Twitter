const express = require('express')
const Counter = require('../model/Counter')
const Comment = require("../model/Comment")
const Tweet = require ('../model/Tweet')

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

const IncreTweetCount = async() =>{
    const TweetCounter = await Counter.findOne({TargetToCount:"Tweet"})
    TweetCounter.Counter = await TweetCounter.Counter + 1
    await TweetCounter.save()
}

const IncreCommentCount = async() =>{

    const CommentCounter = await Counter.findOne({TargetToCount:"Comment"})
    CommentCounter.Counter = CommentCounter.Counter + 1
    await CommentCounter.save()
    
}

module.exports = {
    initializeDB,
    IncreTweetCount,
    IncreCommentCount,
}