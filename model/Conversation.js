const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ConservationSchema = new Schema(
    {
        members: {
            type: Array,
        }
    },
    {timestamps: true}
)

module.exports = Conversation = mongoose.model("Conversation", ConservationSchema)