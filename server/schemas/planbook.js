const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planbookSchema = new Schema({
    planbook_name: String,
    year: String,
    schedule_type: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    }
})

const Planbook = mongoose.model('planbook', planbookSchema)
module.exports = Planbook