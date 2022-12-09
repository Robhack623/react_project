const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
    class_name: String,
    class_subject: String,
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    full_band_lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'fblesson'
    }]
})

const Class = mongoose.model('class', classSchema)
module.exports = Class