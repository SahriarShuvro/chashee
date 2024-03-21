const mongoose = require('mongoose');

// Sub-schema for solution
const solutionSchema = new mongoose.Schema({
    organic: {
        midea: {
            type: [String],
            default: null
        },
        description: { type: String },
        side_effect: { type: String }
    },
    inorganic: {
        midea: {
            type: [String],
            default: null
        },
        description: { type: String },
        side_effect: { type: String }
    }
});

// Main schema for Insects
const insectSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    images: {
        type: [String],
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
    type: {
        type: [String],
    },
    solution: {
        type: solutionSchema
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Insects = mongoose.model('Insects', insectSchema);

module.exports = Insects;
