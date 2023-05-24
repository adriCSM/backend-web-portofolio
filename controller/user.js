const user = require('../Model/user');
const komentar = require('../Model/komentar');
const moment = require('moment');
const tanggal = moment().format('DD MMMM YYYY, h:mm:ss a');
module.exports = class {
    static async add(req, res) {
        const { id, fullName, givenName, familyName, imageUrl, email } = req.body;
        const cek = await user.findOne({ id_google: id });
        if (!cek) {
            await user
                .insertMany({
                    id_google: id,
                    Nama_lengkap: fullName,
                    nama_depan: givenName,
                    nama_belakang: familyName,
                    email: email,
                    img_url: imageUrl,
                    createdAt: tanggal,
                })
                .then(() => {
                    res.status(201).json({ message: 'User berhasil ditambahkan' });
                })
                .catch((err) => {
                    res.status(400).json({ message: err.message });
                });
        } else {
            res.status(400).json({ message: 'Akun sudah terdaftar' });
        }
    }

    static async addKomen(req, res) {
        const { nama, komen, imageUrl } = req.body;
        await komentar
            .insertMany({
                nama,
                image_url: imageUrl,
                komentar: komen,
                createdAt: tanggal,
            })
            .then(() => {
                res.status(201).json({ message: 'Komentar berhasil ditambahkan' });
            })
            .catch((err) => {
                res.status(400).json({ message: err.message });
            });
    }

    static async findKomen(req, res) {
        await komentar
            .find()
            .then(() => {
                res.status(200);
            })
            .catch((err) => {
                res.status(404).json({ message: err.message });
            });
    }
};
