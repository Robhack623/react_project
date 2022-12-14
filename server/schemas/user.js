
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        validate: {
            validator: first_name => first_name.length > 2,
            message: 'Name must be longer than 2 characters'
        }
    },
    last_name: {
        type: String,
        validate: {
            validator: last_name => last_name.length > 2,
            message: 'Name must be longer than 2 characters'
        }
    },
    username: {
        type: String,
        validate: {
            validator: username => username.length > 5,
            message: 'Name must be longer than 5 characters'
        }
    },
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