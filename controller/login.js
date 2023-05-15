const admin = require('../Model/admin');
const profile = require('../Model/profil');
const pendidikan = require('../Model/pendidikan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class {
    /**--------------------------creat admin */
    static async addAdmin(req, res) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('mangidi7', salt);

        await admin.findOne({ name: 'admin' }).then(async (data) => {
            if (!data) {
                admin.insertMany({ name: 'admin', password }).then(() => {
                    res.status(201).json({ message: 'admin berhasil ditambahkan' });
                });
            } else {
                res.status(400).json({ message: 'admin sudah ada' });
            }
        });
    }
    /**---------------------------login */
    static async login(req, res) {
        const { name, password } = req.body;
        await admin
            .findOne({ name })
            .then(async (data) => {
                if (data) {
                    if (password) {
                        const cekPassword = bcrypt.compareSync(password, data.password); //bernilai boolean (true atau false)
                        if (cekPassword) {
                            const profil = await profile.findOne();
                            const skl = await pendidikan.findOne();
                            const accessToken = jwt.sign({ id_profil: profil._id, id_pendidikan: skl._id }, process.env.accessToken, {
                                expiresIn: '10s',
                            });
                            const refreshToken = jwt.sign({ id_profil: profil._id, id_pendidikan: pendidikan._id }, process.env.refreshToken, {
                                expiresIn: '30d',
                            });

                            await admin
                                .findByIdAndUpdate(
                                    { _id: data.id },
                                    {
                                        refreshToken,
                                    },
                                )
                                .then((data) => {
                                    res.cookie('refreshToken', refreshToken, {
                                        httpOnly: true,
                                        maxAge: 24 * 60 * 60 * 1000,
                                        // secure: true,
                                    }),
                                        res.status(200).json({ accessToken });
                                })
                                .catch((e) => {
                                    req.status(403).json(e);
                                });
                        } else {
                            res.status(403).json({ message: 'Password salah' });
                        }
                    } else {
                        res.status(400).json({ message: 'password tidak boleh kosong' });
                    }
                } else {
                    res.send(`nama ${name} tidak ditemukan dalam database. silahkan hubungi developer untuk memperbaikinya`);
                }
            })
            .catch((e) => {
                res.status(404).json({ message: 'gagal mencari data' });
            });
    }

    /**---------------------------logout */
    static async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.sendStatus(204);
        } else {
            await admin
                .findOne()
                .then(async (data) => {
                    if (refreshToken == data.refreshToken) {
                        await admin
                            .findByIdAndUpdate({ _id: data._id }, { refreshToken: null })
                            .then(() => {
                                res.clearcookie('refreshToken');
                                res.status(200).json({ message: 'berhasil logout' });
                            })
                            .catch((err) => {
                                res.json(err);
                            });
                    } else {
                        res.sendStatus(204);
                    }
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    }
};
