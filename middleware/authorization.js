const jwt = require('jsonwebtoken');
const cekToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const accessToken = authHeaders.split(' ')[1];
        jwt.verify(accessToken, process.env.accessToken, (err, encoded) => {
            if (err) {
                res.status(403).json({ err });
            } else {
                req.id_profil = encoded.id_profil;
                req.id_pendidikan = encoded.id_pendidikan;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = cekToken;
