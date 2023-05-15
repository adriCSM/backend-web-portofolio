const profil = require('../Model/profil');
const pendidikan = require('../Model/pendidikan');
module.exports = class {
    /** ------------------------------------get profil*/

    static async getProfil(req, res) {
        const _id = req.id_profil;

        const cekProfil = await profil.findOne();
        const cekPendidikan = await profil.findOne();

        if (!cekPendidikan || !cekProfil) {
            try {
                await pendidikan.insertMany().then(async () => {
                    try {
                        const dataPendidikan = await pendidikan.findOne();
                        await profil.insertMany({ pendidikan: dataPendidikan.id });
                    } catch {
                        res.status(400).json('error: gagal menambahkan data pendidikan');
                    }
                });
            } catch {
                res.status(400).json('error: gagal menambahkan data pendidikan');
            }
        }

        await profil
            .findOne({ _id })
            .populate('pendidikan')
            .then((data) => {
                if (!data) {
                    res.send(`data dengan nama ${nama} tidak ada`);
                } else {
                    res.send(data);
                }
            })
            .catch((e) => {
                res.send(e);
            });
    }
    /**------------------------------------------update profil */
    static async updateProfil(req, res) {
        const _id = req.id_profil;
        const { nama, universitasPekerjaan, biografi } = req;

        await profil
            .findOneAndUpdate({ _id }, { universitasAtauJabatan: universitasPekerjaan, nama, biodata: biografi })
            .then(async () => {
                const data = await profil.findOne({ _id }).populate('pendidikan');
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json({ message: 'tidak dapat mengupdate data. id yang anda masukkan tidak ditemukan' });
            });
    }

    /**------------------------------------------get pendidikan */
    static async getPendidikan(req, res) {
        await pendidikan
            .findOne()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json({ message: 'data tidak ditemukan' });
            });
    }
    /**------------------------------------------update pendidikan */
    static async updatePendidikan(req, res) {
        const _id = req.id_pendidikan;
        const { sdn, smpn, sman, univ, waktuSd, waktuSmp, waktuSma, waktuKuliah } = req.body;
        if (sdn || smpn || sman || univ || waktuSd || waktuSmp || waktuSma || waktuKuliah) {
            await pendidikan
                .findOneAndUpdate(
                    { _id },
                    {
                        sd: { sekolah: sdn, waktu: waktuSd },
                        smp: { sekolah: smpn, waktu: waktuSmp },
                        sma: { sekolah: sman, waktu: waktuSma },
                        perguruanTinggi: {
                            sekolah: univ,
                            waktu: waktuKuliah,
                        },
                    },
                )
                .then(async (data) => {
                    res.status(201).json({ message: 'berhasil update pendidikan' });
                })
                .catch((err) => {
                    res.status(404).json({ err });
                });
        } else {
            res.status(404).json({ message: 'field kosong. tidak ada data yang terupdate' });
        }
    }
};
