
const mongoose = require('mongoose')

const planbookSchema = new mongoose.Schema({
    planbook_name: String,
    year: String,
    schedule_type: String

})

const Planbook = mongoose.model('Planbook', planbookSchema)
module.exports = Planbook