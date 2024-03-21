const mongoose = require('mongoose');

const soilTypeSchema = new mongoose.Schema({
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

const SoilType = mongoose.model('SoilType', soilTypeSchema);

module.exports = SoilType;
