const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentID:{
        type: String,
        required: true,
        unique: true
    },
    CreatorUserID:{
        type: String,
        required: true,
    },
    Content:{
        type: String,
        required: true,
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

module.exports = User = mongoose.model("Comment", CommentSchema);