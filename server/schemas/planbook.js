
const mongoose = require('mongoose')

const planbookSchema = new mongoose.Schema({
    planbook_name: String,
    year: String,
    schedule_type: String,
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class'}]
})

const Planbook = mongoose.model('Planbook', planbookSchema)
module.exports = Planbook