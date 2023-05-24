const mongoose = require('mongoose');

const user = mongoose.model(
    'User',
    new mongoose.Schema({
        id_google: {
            type: String,
            required: true,
        },
        Nama_lengkap: {
            type: String,
            required: true,
        },
        nama_depan: {
            type: String,
            required: true,
        },
        nama_belakang: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        img_url: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
        },
        updatedAt: {
            type: String,
            default: null,
        },
    }),
);

module.exports = user;
