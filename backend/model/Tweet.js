//tweet schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TweetSchema = new Schema({
    tweetID:{
        type: String,
        required: true,
    },
    CreateTime:{
        type: Date,
        required: true,
    },
    CreatorUserID:{
        type: String,
        required: true,
    },
    Content:{
        type: String,
        required: false,
    },
    UrlList:{
        type: Array,
        required: false,
    },
    ImageList:{
        type: Array,
        required: false,
    },
    LikeCount:{
        type: Number,
        required: true,
    },
    DisLikeCount:{
        type: Number,
        required: true,
    },
    ReTweetCount:{
        type: Number,
        required: true
    },
    ReTweetID:{
        type: String,
        required: false
    },
    SuspensionStatus:{
        type: Boolean,
        required: true,
    },
});

module.exports = Tweet = mongoose.model("Tweet", TweetSchema);