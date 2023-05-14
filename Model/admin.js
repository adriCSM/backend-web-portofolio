const mongoose = require('mongoose');

const admin = mongoose.model(
    'admin',
    new mongoose.Schema({
        name: { type: 'string', required: true, default: 'admin' },
        password: { type: 'string', required: true, default: 'mangidi7' },
        refreshToken: {
            type: 'string',
        },
        timestamps: {
            type: 'string',
            default: new Date(),
        },
    }),
);

module.exports = admin;
