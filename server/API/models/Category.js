const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: uuidv4,
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
