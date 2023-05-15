const admin = require('../Model/admin');
const profile = require('../Model/profil');
const pendidikan = require('../Model/pendidikan');
const jwt = require('jsonwebtoken');
module.exports = class {
    static async refreshToken(req, res) {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
            await admin.findOne().then((data) => {
                if (data.refreshToken == refreshToken) {
                    jwt.verify(refreshToken, process.env.refreshToken, async (err, encoded) => {
                        if (err) return res.sendStatus(403);
                        const profil = await profile.findOne();
                        const skl = await pendidikan.findOne();
                        const accessToken = jwt.sign({ id_profil: profil._id, id_pendidikan: skl._id }, process.env.accessToken, {
                            expiresIn: '30m',
                        });
                        res.status(200).json({ accessToken });
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(401);
        }
    }
};
