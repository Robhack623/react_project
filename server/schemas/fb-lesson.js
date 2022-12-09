const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fblessonSchema = new Schema({
    date: String,
    standards: String,
    warm_up: String,
    wu_objective: String,
    wu_plan: String,
    repertoire: String,
    rep_objective: String,
    rehearsal_plan: String,
    assessment: String,
    homework: String,
    accom_mod: String,
    notes: String
})

const FBLesson = mongoose.model('fblesson', fblessonSchema)
module.exports = FBLesson