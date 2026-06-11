const Mongo = require('mongoose')

const UserSchema = Mongo.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        minlength: 3
    },

    name : {
        type : String,
        required : true,
        trim: true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true
    },

    password : {
        type : String,
        required : true,
        select: false,
        minlength: 8
    },

    avatarURL : {
        type : String,
        default: "https://avatars.com" 
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },

    isBanned: {
        type: Boolean,
        default: false
    },

    lastLogin: {
        type: Date
    }

},{ timestamps: true })

const UserDB = Mongo.model('User',UserSchema)

module.exports = UserDB
