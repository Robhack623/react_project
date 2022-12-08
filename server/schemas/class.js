const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    class_name: String,
    class_subject: String
})

const Class = mongoose.model('Class', classSchema)
module.exports = Class