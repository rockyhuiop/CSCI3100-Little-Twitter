//user schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema for follow
const FollowSchema = new Schema({
    tweetID:{
        type: String,
        required: true,
        unique: true
    },
    followers:{
        type: Array
    }
});

module.exports = Follow = mongoose.model("Follow", FollowSchema);