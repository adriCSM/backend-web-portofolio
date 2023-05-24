const user = require('../Model/user');
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
};
