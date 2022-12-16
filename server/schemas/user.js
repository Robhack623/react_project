
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    grade_level: String,
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'class'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }]
})

const User = mongoose.model('user', UserSchema)
module.exports = User