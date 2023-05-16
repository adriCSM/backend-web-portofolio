const mongoose = require('mongoose');

const moto = mongoose.model(
    'Moto',
    new mongoose.Schema({
        tag_line: {
            type: 'string',
            default: 'We Build Digital',
        },
        deskripsi: {
            type: 'string',
            default: 'tuliss descripsi disinsi',
        },
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

module.exports = moto;
