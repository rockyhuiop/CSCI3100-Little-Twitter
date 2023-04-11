const mongoose = require("mongoose")

const ConservationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Conversation", ConservationSchema)