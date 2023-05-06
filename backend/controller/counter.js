const express = require('express')
const Counter = require('../model/Counter')
const Comment = require("../model/Comment")
const Tweet = require ('../model/Tweet')

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
    IncreTweetCount,
    IncreCommentCount,
}