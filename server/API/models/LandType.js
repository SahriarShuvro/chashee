const mongoose = require('mongoose');

const landTypeSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
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
    status: {
        type: Boolean,
        default: true
    }
});

const LandType = mongoose.model('LandType', landTypeSchema);

module.exports = LandType;
