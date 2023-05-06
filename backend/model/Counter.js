const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema for counter
const CounterSchema = new Schema({
    TargetToCount:{
        type: String,
        required: true,
        unique: true
    },
    Counter:{
        type: Number,
        required: true,
    },
});

module.exports = Counter = mongoose.model("Counter", CounterSchema);