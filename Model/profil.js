const mongoose = require('mongoose');

const user = mongoose.model(
    'Profil',
    new mongoose.Schema({
        name: {
            type: 'string',
            default: 'Adri Candra Saputra Mangidi',
        },
        jabatan: {
            type: 'string',
            default: 'Universitas Haluoleo',
        },
        biografi: {
            type: 'string',
            default: 'silakan tambahkan cerita singkat',
        },
        pendidikan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pendidikan',
        },
        moto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Moto',
        },
        projects: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projects',
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
module.exports = user;
