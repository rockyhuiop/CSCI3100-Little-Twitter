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
        type: Array,
        required: true,
    },
    followings:{
        type: Array,
        required: true,
    },
    likedTweetID:{
        type: Array,
        required: true,
    },
    dislikedTweetID:{
        type: Array,
        required: true
    },
    likedCommentID:{
        type: Array,
        required: true,
    },
    dislikedCommentID:{
        type: Array,
        required: true,
    },
});

module.exports = User = mongoose.model("User", UserSchema);