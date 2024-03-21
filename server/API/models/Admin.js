const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'viewer'], // Example roles, customize as needed
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
