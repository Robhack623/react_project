
const mongoose = require('mongoose')
const PlanbookSchema = require('./planbook')

const userSchema = new mongoose.Schema({
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
    user_subject: String,
    planbooks: [PlanbookSchema]
})
 
const User = mongoose.model('User', userSchema)
module.exports = User