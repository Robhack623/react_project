const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    class_name: String,
    class_subject: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    }
})

const Class = mongoose.model('class', classSchema)
module.exports = Class