const Mongo = require('mongoose')

const ReviewSchema = Mongo.Schema({
    userid: {
        type: Mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    gameid: {
        type: Mongo.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },

    review: {
    type: String,
    default: "",
    trim: true
},

rating: {
    type: Number,
    min: 1,
    max: 10,
    default: null
},

}, { timestamps: true })

ReviewSchema.index({ userid: 1, gameid: 1 }, { unique: true });

const ReviewDB = Mongo.model('Review', ReviewSchema)

module.exports = ReviewDB
