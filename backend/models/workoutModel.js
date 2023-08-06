const mongoose = require('mongoose')

const Schema = mongoose.Schema

// defines the structure
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

// add added and modifyed timestamps will be included

// creates a model based on schema
module.exports = mongoose.model('Workout', workoutSchema)