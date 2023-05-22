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
            default:
                'Web ini merupaka portfolio saya yang berisikan biodata serta project-project yang telah saya buat. Jika ingin membuat sebuah website silakan hubungi saya melalui sosial media atau dengan mengisi form Contact Me pada halaman paling bawah',
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
            type: Array,
        },
        skillHobi: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillHobi',
        },
        url_img: { type: String, default: '' },
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
