const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

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

// Main schema for Disease
const diseaseSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   default: uuidv4,
  //   required: true,
  //   unique: true
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
    required: true
  },
  solution: {
    type: solutionSchema
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
