const mongoose = require('mongoose');

const pendidikan = mongoose.model(
    'pendidikan',
    new mongoose.Schema({
        sd: {
            sekolah: {
                type: 'string',
                default: 'SD Negeri 2 Lambangi',
            },
            waktu: {
                type: 'string',
                default: '2006 - 2012',
            },
        },
        smp: {
            sekolah: {
                type: 'string',
                default: 'SMP Negeri 1 Wonggeduku',
            },
            waktu: {
                type: 'string',
                default: '2012 - 2015',
            },
        },
        sma: {
            sekolah: {
                type: 'string',
                default: 'SMA Negeri 1 Wonggeduku',
            },
            waktu: {
                type: 'string',
                default: '2015 - 2018',
            },
        },
        perguruanTinggi: {
            sekolah: {
                type: 'string',
                default: 'Universitas Haluoleo',
            },
            waktu: {
                type: 'string',
                default: '2018 - sekarang',
            },
        },
    }),
);

module.exports = pendidikan;
