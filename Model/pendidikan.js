const mongoose = require('mongoose');

const pendidikan = mongoose.model(
    'Pendidikan',
    new mongoose.Schema({
        data: { type: Array },
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

module.exports = pendidikan;
