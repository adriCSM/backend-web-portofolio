const mongoose = require('mongoose');

const user = mongoose.model(
    'profil',
    new mongoose.Schema({
        nama: { type: 'string', default: 'Adri Candra Saputra Mangidi' },
        universitasAtauJabatan: { type: 'string', default: 'Universitas Haluoleo' },
        biodata: { type: 'string', default: 'silakan tambahkan cerita singkat' },
        pendidikan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pendidikan',
        },
        createdAt: { type: 'string', default: new Date() },
    }),
);
module.exports = user;
