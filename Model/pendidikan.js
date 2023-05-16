const mongoose = require('mongoose');

const pendidikan = mongoose.model(
    'Pendidikan',
    new mongoose.Schema({
        data: [
            {
                jenjang: 'string',
                nama_sekolah: 'string',
                waktu: 'string',
                tahun_mulai: 'string',
            },
        ],
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
