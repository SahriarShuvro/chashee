const mongoose = require('mongoose');

// Sub-schema for time
const timeSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

// fertilizers
const fertilizersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});

// Sub-schema for distance
const distanceSchema = new mongoose.Schema({
    plant_to_plant: {
        type: String,
        required: true
    },
    row_to_row: {
        type: String,
        required: true
    }
});

// Sub-schema for range
const rangeSchema = new mongoose.Schema({
    min: {
        type: String,
        required: true
    },
    max: {
        type: String,
        required: true
    }
});

// Main schema for Cultivation
const cultivationSchema = new mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
        required: true
    },
    land_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LandType',
        required: true
    },
    soil_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SoilType',
        required: true
    },
    sowing_time: {
        type: [timeSchema],
        required: true
    },
    planting_time: {
        type: [timeSchema],
        required: true
    },
    seedling_amount: {
        type: String,
        required: true
    },
    distance: {
        type: distanceSchema,
        required: true
    },
    fertilizers: {
        type: [fertilizersSchema],
        require: true
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    },
    insects: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insects'
    },
    harvest_time: {
        type: [timeSchema],
        required: true
    },
    crop_production: {
        type: rangeSchema,
        required: true
    },
    crop_prices: {
        type: rangeSchema,
        required: true
    },
    cost: {
        type: rangeSchema,
        required: true
    },
    profit: {
        type: rangeSchema,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);

const Cultivation = mongoose.model('Cultivation', cultivationSchema);

module.exports = Cultivation;
