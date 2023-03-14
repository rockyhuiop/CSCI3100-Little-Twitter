//user schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    tweetID:{
        type: String,
        required: true,
        unique: true
    },
    userType:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    followers:{
        type: String,
        required: true,
    },
    followings:{
        type: String,
        required: true,
    },
    likedTweetID:{
        type: String,
        required: true,
    },
    dislikedTweetID:{
        type: String,
        required: true
    },
    likedCommentID:{
        type: String,
        required: true,
    },
    dislikedCommentID:{
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("User", UserSchema);