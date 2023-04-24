const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('score', ScoreSchema);