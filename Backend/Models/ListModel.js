const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    status: {
        type: String,
        enum: ['want', 'played', null],
        default: null
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

ListSchema.index({ userid: 1, gameid: 1 }, { unique: true });

const ListDB = mongoose.model('List', ListSchema);
module.exports = ListDB;
