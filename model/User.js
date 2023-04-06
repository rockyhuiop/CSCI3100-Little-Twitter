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
    },
    followings:{
        type: Array,
    },
    likedTweetID:{
        type: Array,
    },
    dislikedTweetID:{
        type: Array,
    },
    likedCommentID:{
        type: Array,
    },
    dislikedCommentID:{
        type: Array,
    },
    avatar:{
        data: Buffer,
        contentType: String,
    },
    banner:{
        data: Buffer,
        contentType: String,
    }
});

module.exports = User = mongoose.model("User", UserSchema);