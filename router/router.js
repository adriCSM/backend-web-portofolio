const express = require('express');
const router = express.Router();
const handlerProfil = require('../controller/profil');
const handlerLogin = require('../controller/login');
const handlerProject = require('../controller/project');
const cekToken = require('../config/authorization');

router.get('/', (req, res) => {
    res.status(200).json({ data: 'API dapat digunakan' });
});
/**add admin & login */
router.post('/admin', handlerLogin.addAdmin);
router.post('/login', handlerLogin.login);

// api handler profil
router.get('/profile', cekToken, handlerProfil.getProfil);
router.put('/profile', cekToken, handlerProfil.updateProfil);
router.get('/profile/pendidikan', cekToken, handlerProfil.getPendidikan);
router.put('/profile/pendidikan', cekToken, handlerProfil.updatePendidikan);

// api handler project
router.get('/projects', cekToken, handlerProject.getProject);
router.post('/project', cekToken, handlerProject.addProject);
router.put('/project', cekToken, handlerProject.updateProject);

module.exports = router;
