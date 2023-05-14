const project = require('../Model/project');

module.exports = class {
    /**---------------------get Project */
    static async getProject(req, res) {
        await project
            .find()
            .then((data) => {
                if (data == !data) {
                    res.status(404).json({ message: 'data kosong' });
                } else {
                    res.status(200).json(data);
                }
            })
            .catch((err) => {
                res.status(404).json({ message: err.message });
            });
    }
    /**---------------------add Project */
    static async addProject(req, res) {
        const nama = req.body.nama;
        const image_url = req.body.image_url;
        const url = req.body.url;

        await project
            .insertMany({ nama, image_url, url })
            .then(() => {
                res.status(201).json({ message: 'product berhasi diatambahkan' });
            })
            .catch((err) => {
                res.status(400).json({ message: err.message });
            });
    }
    /**---------------------update Project */
    static async updateProject(req, res) {
        const _id = req.body.id;
        const nama = req.body.nama;
        const image_url = req.body.image_url;
        const url = req.body.url;
        await project
            .findOneAndUpdate({ _id }, { nama, image_url, url })
            .then(async (data) => {
                res.status(201).json({ message: 'berhasil memperbarui project' });
            })
            .catch(() => {
                res.status(400).json({ message: 'gagal memperbarui data' });
            });
    }
};
