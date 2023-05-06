const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema for comments
const CommentSchema = new Schema({
    commentID:{
        type: String,
        required: true,
        unique: true
    },
    CreateTime:{
        type: Date,
        required: true,
    },
    corrTweetID:{
        type: String,
        required: false,
    },
    corrCommentID:{
        type: String,
        required: false,
    },
    CreatorUserID:{
        type: String,
        required: true,
    },
    Content:{
        type: String,
        required: true,
    },
    UrlList:{
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
    SuspensionStatus:{
        type: Boolean,
        required: true,
    },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);