const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    date: String,
    warm_up: String,
    repertoire: String,
    rehearsal_plan: String,
    assessment: String,
    homework: String,
    accom_mod: String,
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'class'
    }
})

const Lesson = mongoose.model('lesson', lessonSchema)
module.exports = Lesson