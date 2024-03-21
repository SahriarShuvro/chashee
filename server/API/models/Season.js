const mongoose = require('mongoose');

const durationSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

const seasonSchema = new mongoose.Schema({
    //   id: {
    //     type: String,
    //     required: true,
    //     unique: true
    //   },
    thumb: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: durationSchema,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
