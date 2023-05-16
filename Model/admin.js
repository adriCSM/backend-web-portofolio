const mongoose = require('mongoose');

const admin = mongoose.model(
    'Admin',
    new mongoose.Schema({
        name: { type: 'string', required: true, default: 'admin' },
        password: { type: 'string', required: true, default: 'mangidi7' },
        createdAt: {
            type: 'string',
            default: '',
        },
        updatedAt: {
            type: 'string',
            default: '',
        },
    }),
);

module.exports = admin;
