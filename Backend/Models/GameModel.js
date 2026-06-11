const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    
    rawgId: {
        type: Number,
        unique: true,
        sparse: true 
    },
    isImported: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    genre: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: "At least one genre is required."
        }
    },
    platforms: {
        type: [String],
        required: true,
        default: ['PC']
    },
    releaseDate: {
        type: Date,
        required: true
    },
    developer: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    coverImage: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastupdatedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

GameSchema.index(
    { title: 1, developer: 1, releaseDate: 1 }, 
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const GameDB = mongoose.model('Game', GameSchema);

module.exports = GameDB;