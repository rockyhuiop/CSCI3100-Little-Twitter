const express = require('express')
const Counter = require('../model/Counter')
const Comment = require("../model/Comment")
const Tweet = require ('../model/Tweet')

const CountTweetID = async () => { 
    const totalTweetCount = await Tweet.count()
    return totalTweetCount
}

const CountCommentID = async () => { 
    const totalCommentCount = await Comment.count()
    return totalCommentCount
}

const initializeDB = async() => {
    var TweetCount = await CountTweetID()
    var CommentCount = await CountCommentID()

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

const updateTweetCount = async() =>{
    const TweetCounter = await Counter.findOne({TargetToCount:"Tweet"})
    TweetCounter.Counter = await CountTweetID()
    await TweetCounter.save()
}

const updateCommentCount = async() =>{

    const CommentCounter = await Counter.findOne({TargetToCount:"Comment"})
    CommentCounter.Counter = await CountCommentID()
    await CommentCounter.save()
    
}

module.exports = {
    initializeDB,
    updateTweetCount,
    updateCommentCount,
}