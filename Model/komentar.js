const mongoose = require('mongoose');

const komentar = mongoose.model(
    'Komentar',
    new mongoose.Schema({
        image_url: {
            type: String,
        },
        nama: {
            type: String,
        },
        komentar: {
            type: String,
        },
        createdAt: {
            type: String,
        },
    }),
);

module.exports = komentar;
