const mongoose = require('mongoose')

const fblessonSchema = new mongoose.Schema({
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

const FBLesson = mongoose.model('FBLesson', fblessonSchema)
module.exports = FBLesson