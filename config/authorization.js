const jwt = require('jsonwebtoken');
const cekToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const accessToken = authHeaders.split(' ')[1];
        jwt.verify(accessToken, process.env.accessToken, (err, encoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.id_profil = encoded.id_profil;
                req.id_pendidikan = encoded.id_pendidikan;
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = cekToken;
