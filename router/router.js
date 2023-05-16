const express = require('express');
const router = express.Router();
const Profil = require('../controller/profil');
const admin = require('../controller/admin');
const cekAdmin = require('../middleware/cekAdmin');

router.get('/', (req, res) => {
    res.status(200).json({ data: 'API dapat digunakan' });
});
/** login */
router.post('/admin/login', cekAdmin, admin.login);

// api handler profil
router.get('/profile', Profil.getProfile);
// no body

router.put('/profile', Profil.editProfile);
// body{name, jabatan, biografi }

router.put('/profile/pendidikan', Profil.editPendidikan);
// body { sd, sekolahSd, waktuSd, mulaiSd, smp, sekolahSmp, waktuSmp, mulaiSmp,
//  sma, sekolahSma, waktuSma, mulaiSma, kuliah, univ, waktuKuliah, mulaiKuliah }

router.delete('/profile/skill', Profil.deleteSkill);
//body{skillName}
router.put('/profile/skill', Profil.editSkill);
//body{skillName, edit}
router.post('/profile/skill', Profil.addSkill);
//body{skillName}

router.post('/profile/project', Profil.addProject);
// body { name, image_url, url }

router.put('/profile/project/:id', Profil.editProject);
// body { name, image_url, url } params id

router.delete('/profile/project/:id', Profil.hapusProject);
// no body , params id

router.put('/profile/moto', Profil.editMoto);
// body { tag_line, deskripsi }

router.delete('/logout');

module.exports = router;
