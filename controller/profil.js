const profil = require('../Model/profil');
const pendidikan = require('../Model/pendidikan');
const moto = require('../Model/moto');
const skillHobi = require('../Model/skillHobi');
const moment = require('moment');
const tanggal = moment().format('DD MMMM YYYY, h:mm:ss a');

module.exports = class {
    /**------------------------------find, insert, get database profile*/
    static async getProfile(req, res) {
        const findProfil = await profil.findOne();
        const findMoto = await moto.findOne();
        const findSkillHobi = await skillHobi.findOne();
        const findPendidikan = await pendidikan.findOne();

        if (!findProfil && !findPendidikan && !findMoto && !findSkillHobi) {
            try {
                const b = await moto.insertMany({ createdAt: tanggal });
                const c = await skillHobi.insertMany({ createdAt: tanggal });
                const d = await pendidikan.insertMany({
                    createdAt: tanggal,
                    data: [
                        {
                            jenjang: 'Sekolah Dasar',
                            nama_sekolah: 'SD Negeri 2 Lambangi',
                            waktu: '2006-2012',
                            tahun_mulai: '2006',
                        },
                        {
                            jenjang: 'Sekolah Menengah Pertama',
                            nama_sekolah: 'SMP Negeri 1 Wonggeduku',
                            waktu: '2012-2015',
                            tahun_mulai: '2012',
                        },
                        {
                            jenjang: 'Sekolah Menengah Atas',
                            nama_sekolah: 'SMA Negeri 1 Wonggeduku',
                            waktu: '2015-2018',
                            tahun_mulai: '2015',
                        },
                        {
                            jenjang: 'Perguruan Tinggi',
                            nama_sekolah: 'Universitas Haluoleo',
                            waktu: '2018-sekarang',
                            tahun_mulai: '2018',
                        },
                    ],
                });

                const db = await profil.insertMany({ createdAt: tanggal, pendidikan: d[0]._id, moto: b[0]._id, skillHobi: c[0]._id });

                await profil
                    .findOne({ _id: db[0]._id })
                    .populate('pendidikan') //pilih nama atribut db profil
                    .populate('moto')
                    .populate('projects')
                    .populate('projects')
                    .populate('skillHobi')
                    .then((data) => {
                        res.status(200).json(data);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            } catch {
                res.status(400).json({ message: 'Database gagal ditambahkan' });
            }
        } else {
            await profil
                .findOne()
                .populate('pendidikan') //pilih nama atribut db profil
                .populate('moto')
                .populate('projects')
                .populate('skillHobi')
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    }

    /**------------------------------Edit profile */
    static async editProfile(req, res) {
        const { name, jabatan, biografi, url } = req.body;

        const data = await profil.findOne();
        await profil
            .findOneAndUpdate({ _id: data._id }, { name, jabatan, biografi, updatedAt: tanggal, url_img: url })
            .then(() => {
                res.status(201).json({ message: 'Profil berhasil diperbaharui' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }

    /**------------------------------Edit pendidikan */
    static async editPendidikan(req, res) {
        const { sd, sekolahSd, waktuSd, mulaiSd, smp, sekolahSmp, waktuSmp, mulaiSmp, sma, sekolahSma, waktuSma, mulaiSma, kuliah, univ, waktuKuliah, mulaiKuliah } = req.body;
        const data = await pendidikan.findOne();

        await pendidikan
            .findOneAndUpdate(
                { _id: data._id },
                {
                    data: [
                        {
                            jenjang: sd,
                            nama_sekolah: sekolahSd,
                            waktu: waktuSd,
                            tahun_mulai: mulaiSd,
                        },
                        {
                            jenjang: smp,
                            nama_sekolah: sekolahSmp,
                            waktu: waktuSmp,
                            tahun_mulai: mulaiSmp,
                        },
                        {
                            jenjang: sma,
                            nama_sekolah: sekolahSma,
                            waktu: waktuSma,
                            tahun_mulai: mulaiSma,
                        },
                        {
                            jenjang: kuliah,
                            nama_sekolah: univ,
                            waktu: waktuKuliah,
                            tahun_mulai: mulaiKuliah,
                        },
                    ],
                    updatedAt: tanggal,
                },
            )
            .then(() => {
                res.status(201).json({ message: 'Pendidikan berhasil diperbaharui' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }

    /**------------------------------Tambah project */
    static async addProject(req, res) {
        const { name, image_url, url } = req.body;
        const item = await profil.findOne();
        await profil
            .findOneAndUpdate(
                { _id: item._id },
                {
                    $push: { projects: { name, image_url, url, createdAt: tanggal } },
                },
            )
            .then(() => {
                res.status(201).json({ message: 'Project berhasil ditambahkan' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }

    /**------------------------------hapus project */
    static async hapusProject(req, res) {
        const { name } = req.body;
        const projek = await profil.findOne();

        await profil
            .findOneAndUpdate(
                { _id: projek._id },
                {
                    $pull: { projects: { name } },
                },
            )
            .then(() => {
                res.status(201).json({ message: 'Project berhasil dihapus' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }

    /**------------------------------Edit Moto */
    static async editMoto(req, res) {
        const { tag_line, deskripsi } = req.body;
        const data = await moto.findOne();
        await moto
            .findByIdAndUpdate(
                { _id: data._id },
                {
                    tag_line,
                    deskripsi,
                    updatedAt: tanggal,
                },
            )
            .then(() => {
                res.status(201).json({ message: 'Moto berhasil diperbaharui' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }

    /**------------------------------Delete Skill*/
    static async deleteSkill(req, res) {
        const { skillName } = req.body;
        const data = await skillHobi.findOne();

        const cekInputan = data.skill.includes(skillName);
        if (cekInputan) {
            await skillHobi
                .findByIdAndUpdate(
                    { _id: data._id },
                    {
                        $pull: { skill: skillName },
                    },
                )
                .then(() => {
                    res.status(200).json({ message: 'Skill berhasil dihapus' });
                })
                .catch((err) => {
                    res.status(400).json({ message: err });
                });
        } else {
            res.status(400).json({ message: 'Inputan tidak sesuai dengan data skill. Perhatikan huruf kapital maupun spasi' });
        }
    }

    /**------------------------------edit Skill*/
    static async editSkill(req, res) {
        const { skillName, edit } = req.body;
        const data = await skillHobi.findOne();

        const cekSkill = data.skill.includes(skillName);

        if (cekSkill) {
            await skillHobi
                .findByIdAndUpdate(
                    { _id: data._id },
                    {
                        $set: { 'skill.$[element]': edit },
                    },
                    {
                        arrayFilters: [{ element: skillName }],
                    },
                )
                .then((data) => {
                    res.status(200).json({ message: 'Skill berhasil diperbarui' });
                })
                .catch((err) => {
                    res.status(400).json({ message: err });
                });
        } else {
            res.status(400).json({ message: 'Inputan tidak sesuai dengan data skill. Perhatikan huruf kapital maupun spasi' });
        }
    }
    /**------------------------------Tambah Skill*/
    static async addSkill(req, res) {
        const { skillName } = req.body;
        const data = await skillHobi.findOne();
        await skillHobi
            .findByIdAndUpdate(
                { _id: data._id },
                {
                    $push: { skill: skillName },
                },
            )
            .then((data) => {
                res.status(200).json({ message: 'Berhasi menambahkan skill' });
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    }
};
