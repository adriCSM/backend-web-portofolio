const express = require('express');

const router = express.Router();
const Profil = require('../controller/profil');
const admin = require('../controller/admin');
const user = require('../controller/user');
const cekAdmin = require('../middleware/cekAdmin');

router.get('/', (req, res) => {
  res.status(200).json({ data: 'API dapat digunakan' });
});
/** login */
router.post('/admin/login', cekAdmin, admin.login);
router.post('/user', user.add);
router.post('/user/comment', user.addKomen);
router.get('/user/comment', user.findKomen);

router.get('/profile', Profil.getProfile);
router.put('/profile', Profil.editProfile);
router.put('/profile/pendidikan', Profil.editPendidikan);
router.delete('/profile/skill', Profil.deleteSkill);
router.put('/profile/skill', Profil.editSkill);
router.post('/profile/skill', Profil.addSkill);
router.post('/profile/project', Profil.addProject);
router.delete('/profile/project', Profil.hapusProject);

router.put('/profile/moto', Profil.editMoto);

router.delete('/logout');

module.exports = router;
