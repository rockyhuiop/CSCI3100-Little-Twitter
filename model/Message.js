const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        conversationID: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {timestamps: true}
)

module.exports = Message = mongoose.model("Message", MessageSchema)